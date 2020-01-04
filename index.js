var Combiner = require('stream-combiner'),
    geojsonStream = require('geojson-stream'),
    hash = require('object-hash');

module.exports.dedupeStream = dedupeStream;

function dedupeStream(options) {
    var seenHashes = new Set([]);
    return Combiner(geojsonStream.parse(function(feature, index) {
            var featureHash = hash(feature);
            if (seenHashes.has(featureHash)) {
                return null;
            }
            seenHashes.add(featureHash);
            return feature;
        }),
        geojsonStream.stringify());
}