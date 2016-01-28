var Rx = require('rx'),
    Observable = Rx.Observable;

QUnit.module('Mapping');

var __ = 'Fill in the blank';

test('flatMap can be a cartesian product', function () {
  var results = [];
  Observable.range(1, 3)
    .flatMap(function (x, i) {
      return Observable.range(x, i); // 1... length 0 = []
                                     // 2... length 1 = [2]
                                     // 3... length 2 = [3, 4]
    })
    .subscribe(function(x) {
        results.push(x);
    });

  equal('234', results.join(''));
});

test('flatMapLatest only gets us the latest value', function () {
  var results = [];
  Observable.range(1, 3)
    .flatMapLatest(function (x) {
      return Observable.range(x, 3); // 1,1... length 0 = [1, 2, 3]
                                     // 2,2... length 1 = [2, 3, 4]
                                     // 3,3... length 2 = [3, 4, 5]
                                     //
                                     // The first is emitted and then then
                                     // new set is recieved before the second
                                     // or third get chance, I think, which
                                     // causes them to be discareded. Seems a
                                     // bit dirty, how could we know that?
    })
    .subscribe(function(x) {
        results.push(x)
    });

  equal('12345', results.join(''));
});
