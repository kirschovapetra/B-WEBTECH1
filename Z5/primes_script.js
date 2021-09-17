//algoritmus hladania prvocisel prevzaty z: https://gist.github.com/s22su/fdd69d441983e122176f

function isPrime(number){
    var start = 2;
    while (start <= Math.sqrt(number)) {
        if (number % start++ < 1) return false;
    }
    return number > 1;
}

function postPrimes(min, max){
    for (var current = min; current <= max; current++) {
        if (isPrime(current)) {
            postMessage(current);
        }
    }
    postMessage(null);
}

onmessage = function(event){
     postPrimes(event.data.start, event.data.end);
};



