const showComparationCard = (first, second) => {
  if(first && second){
    $(".comparation-card").show();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  parser = new DOMParser();
  let baseUrl = "https://cors-anywhere.herokuapp.com/www.fundamentus.com.br/detalhes.php?papel="

  $(".compare-btn").on("click", function(){
    let firstReady = false;
    let secondReady = false;

    fetch(`${baseUrl}${$("#stock-1").val()}`).then(response => response.text()).then(data => {
      doc = parser.parseFromString(data, "text/html")
      $(".comparation").append(doc.querySelectorAll(".atual strong")[0].innerHTML);
      firstReady = true;
      showComparationCard(firstReady, secondReady);
    })

    fetch(`${baseUrl}${$("#stock-2").val()}`).then(response => response.text()).then(data => {
      doc = parser.parseFromString(data, "text/html")
      $(".comparation").append(doc.querySelectorAll(".atual strong")[0].innerHTML);
      secondReady = true;
      showComparationCard(firstReady, secondReady);
    })
  });
});
