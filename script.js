const fileInput = document.querySelector('.file-input');
const filterOptions = document.querySelectorAll('.filter button');
const filterValue = document.querySelector('.slider .value');
const filterSlider = document.querySelector('.slider input');
const filterName = document.querySelector('.filter-info .name');
const rotateOptions = document.querySelectorAll('.rotate button');
const resetFilterBtn = document.querySelector('.reset-filter');
const previewImage = document.querySelector('.preview-img img');
const chooseImgBtn = document.querySelector('.choose-img');

let brightness = 100,saturation = 100, inversion =0 ,grayScale = 0;
let rotate =0,flipHorizontal=1,flipVertical=1

const applyFilters= ()=>{
    previewImage.style.transform=`rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`;
    previewImage.style.filter =`brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayScale}%)`
}

const loadImage=()=>{
    let file = fileInput.files[0];
    console.log(file);
    if(!file)return
    previewImage.src = URL.createObjectURL(file);
    previewImage.addEventListener('load',()=>{
        document.querySelector('.container').classList.remove('disable')
    })
}

filterOptions.forEach(option=>{
    option.addEventListener('click',()=>{
        document.querySelector('.filter .active').classList.remove('active');
        option.classList.add('active');

        filterName.innerHTML=option.innerHTML;

        if(option.id==="brightness"){
            filterSlider.value=brightness
            filterValue.innerHTML=`${brightness}%`
        }else if(option.id==="saturation"){
            filterSlider.value=saturation
            filterValue.innerHTML=`${saturation}%`
        }else if(option.id==="inversion"){
            filterSlider.value=inversion
            filterValue.innerHTML=`${inversion}%`
        }else if(option.id==="grayScale"){
            filterSlider.value=grayScale
            filterValue.innerHTML=`${grayScale}%`
        }
    });
});

const updateFilter = ()=>{
    console.log(filterSlider.value);
    filterValue.innerHTML=`${filterSlider.value}%`;
    const selectedFilter= document.querySelector('.filter .active');

    if(selectedFilter.id==="brightness"){
        brightness=filterSlider.value;
    }else if(selectedFilter.id==="saturation"){
        saturation=filterSlider.value
    }else if(selectedFilter.id==="inversion"){
        inversion=filterSlider.value
    }else if(selectedFilter.id==="grayScale"){
        grayScale=filterSlider.value
    }
    applyFilters();
}
rotateOptions.forEach(option=>{
    option.addEventListener('click',()=>{
        if(option.id==='left'){
            rotate-=90
        }else if(option.id==='rigth'){
            rotate+=90
        }else if(option.id==='horizontal'){
            flipHorizontal=flipHorizontal=== 1 ? -1: 1;
        }else{
            flipVertical=flipVertical=== 1 ? -1: 1;
        }
        applyFilters()
    })
})
const resetFilter = ()=>{
     brightness = 100,saturation = 100, inversion =0 ,grayScale = 0;
     rotate =0,flipHorizontal=1,flipVertical=1
     applyFilters () 
}

filterSlider.addEventListener('input',updateFilter);
fileInput.addEventListener('change',loadImage);
resetFilterBtn.addEventListener('click',resetFilter)
chooseImgBtn.addEventListener('click',()=>fileInput.click());