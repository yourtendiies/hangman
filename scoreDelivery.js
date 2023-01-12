
function scoreDelivery(score){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            score.value = this.responseText;
            // console.info(this.responseText);
        };
    };
    xhr.open("POST","dbManagement/score.php");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("score="+score);
};
