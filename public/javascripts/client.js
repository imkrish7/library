
var option = document.querySelector('#option');
var hide = option.options[option.selectedIndex].value;
var show;
function run() {
    option = document.querySelector('#option');
    show=option.options[option.selectedIndex].value;

    document.getElementById(show).style.display = "block"
    document.getElementById(hide).style.display="none"
    console.log(hide,show)
    hide=show;

}

