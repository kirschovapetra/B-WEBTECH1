var activeSlideIndex = 0;
var isSlideShowActive = false;
var timer = null;

//spustenie a zastavenie timera
function startTimer(){
	isSlideShowActive = true;
	timer = setInterval("moveRight()", 1500);
    document.getElementById("slideShowButton").innerHTML = "&#8718";  
}
function stopTimer(){
	isSlideShowActive = false;
	clearInterval(timer);
	document.getElementById("slideShowButton").innerHTML = "&#x25BA";
}

//vyprazdnenie nahladu
function clearFullSizeView(){
    var fullSzPhotoDivs = document.getElementsByClassName("fullSzPhoto-div");

    for (var i = 0; i < fullSzPhotoDivs.length; i++){
        fullSzPhotoDivs[i].style.display = "none";
	}
}
//zatvorenie nahladu
function closeFullSizeView(){
    var fullSizeViewArticle = document.getElementById("fullSizeView-article");

    clearFullSizeView();
    fullSizeViewArticle.style.display = "none";
    if(isSlideShowActive == true){
        stopTimer();
    }
}
//zobrazenie nahladu obrazku s indexom = "index"
function showFullSizeView(index){
    clearFullSizeView();

    var fullSizeViewArticle = document.getElementById("fullSizeView-article");
    var currentImg = document.getElementsByClassName("smallImg")[index];
    var toShow = document.getElementsByClassName("fullSzPhoto-div")[index];


    currentImg.onclick = function() {
        activeSlideIndex = index;
        toShow.style.display="flex";
        fullSizeViewArticle.style.display = "block";
    }

    //ked sa klikne mimo okna, tak sa okno zatvori a vypne sa slideshow (ak je spustena)
    window.onclick = function(event) {
        if (event.target == fullSizeViewArticle) {
            clearFullSizeView();
            fullSizeViewArticle.style.display = "none";
            if(isSlideShowActive == true){
                stopTimer();
            }
        }
    }
}

//posun vlavo
function moveLeft(){
    var fullSzPhotoDivs = document.getElementsByClassName("fullSzPhoto-div");
    activeSlideIndex--;
    if (activeSlideIndex < 0){
        activeSlideIndex = fullSzPhotoDivs.length-1;
    }
    clearFullSizeView();
    fullSzPhotoDivs[activeSlideIndex].style.display = "flex";
}
//posun vpravo
function moveRight(){
    var fullSzPhotoDivs = document.getElementsByClassName("fullSzPhoto-div");
    activeSlideIndex++;
    if (activeSlideIndex >= fullSzPhotoDivs.length){
        activeSlideIndex = 0;
    }
    clearFullSizeView();
    fullSzPhotoDivs[activeSlideIndex].style.display = "flex";
}
//spustenie slideshow
function slideShow(){
    if(isSlideShowActive == false){
        startTimer();
    }
    else{
        stopTimer();
    }
}

//naplnenie section obrazkami z images.json
function insertPicturesToSection(){
    $(document).ready(function(){
        $.getJSON("images.json", function(photosArray){

            var galleryArticle = document.getElementById("gallery-article");
            var fullSzPhotoWrap = document.getElementById("fullSzPhoto-wrap");

            for (var i in photosArray.photos){
                var smallSrc = "images_small/"+photosArray.photos[i].src;
                var fullSzSrc = "images/"+photosArray.photos[i].src;
                var name = photosArray.photos[i].title;
                var descr = photosArray.photos[i].description;

                //galeria s malymi obrazkami
                galleryArticle.innerHTML += "<img src="+smallSrc+" width='250' height='250' class='smallImg' onclick='showFullSizeView("+i+")'> \n";

                var imgInnerHTML = "<div class='imgCol column'>\n";
                imgInnerHTML += "<img src="+fullSzSrc+" class='fullSzImg'>\n";
                imgInnerHTML +="</div>";

                var descriptionInnerHTML = "<div class='descrCol column'>\n";
                descriptionInnerHTML+="<h2>"+name+"</h2>\n";
                descriptionInnerHTML+="<p>"+descr+"</p>\n";
                descriptionInnerHTML+="</div>";

                //nahlady obrazkov
                fullSzPhotoWrap.innerHTML+="<div class='fullSzPhoto-div'>"+imgInnerHTML+descriptionInnerHTML+"</div>";
            }
        });
    });
}



