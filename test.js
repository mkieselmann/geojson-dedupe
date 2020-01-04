var geojsonDedupe = require('./'),
    test = require('tape'),
    concat = require('concat-stream'),
    fs = require('fs');

test('streaming dedupe', function (t) {
    var stream = geojsonDedupe.dedupeStream
    var inStream = fs.createReadStream('fixtures/featureCollection.geojson');
    inStream
        .pipe(stream(null))
        .pipe(concat(function (combined) {
            t.equal(JSON.parse(combined).features.length, 2);
            t.end();
        }));
});
