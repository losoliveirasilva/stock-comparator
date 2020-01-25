const comparisonReady = (first, second) => {
  if(first && second){
    $(".comparation-card").show();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  parser = new DOMParser();
  let baseUrl = "https://cors-anywhere.herokuapp.com/www.fundamentus.com.br/detalhes.php?papel="

  $(".compare-btn").on("click", function(){
    firstStock = $("#stock-1").val();
    secondStock = $("#stock-2").val();

    if(firstStock == ""  || secondStock == ""){
      return;
    }

    let firstReady = false;
    let secondReady = false;

    fetch(`${baseUrl}${firstStock}`).then(response => response.text()).then(data => {
      doc = parser.parseFromString(data, "text/html")
      $(".company-code#company-code-stock-1").append(doc.querySelectorAll(".conteudo table tr td span")[2].innerHTML);
      $(".company-name#company-name-stock-1").append(doc.querySelectorAll(".conteudo table tr td span")[14].innerHTML);
      $(".company-value#company-value-stock-1").append(`R$ ${doc.querySelectorAll(".conteudo table tr td span")[38].innerHTML}`);
      $(".company-patrimony#company-patrimony-stock-1").append(`R$ ${doc.querySelectorAll(".conteudo table tr td span")[150].innerHTML}`);

      firstReady = true;
      comparisonReady(firstReady, secondReady);
    })

    fetch(`${baseUrl}${secondStock}`).then(response => response.text()).then(data => {
      doc = parser.parseFromString(data, "text/html")
      $(".company-code#company-code-stock-2").append(doc.querySelectorAll(".conteudo table tr td span")[2].innerHTML);
      $(".company-name#company-name-stock-2").append(doc.querySelectorAll(".conteudo table tr td span")[14].innerHTML);
      $(".company-value#company-value-stock-2").append(`R$ ${doc.querySelectorAll(".conteudo table tr td span")[38].innerHTML}`);
      $(".company-patrimony#company-patrimony-stock-2").append(`R$ ${doc.querySelectorAll(".conteudo table tr td span")[150].innerHTML}`);

      secondReady = true;
      comparisonReady(firstReady, secondReady);
    })
  });
});
