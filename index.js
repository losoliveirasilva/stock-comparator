const comparisonReady = (firstReady, firstStock, secondReady, secondStock) => {
  if(firstReady && secondReady){
    populateTable(firstStock, secondStock);
  }
}

const compareValues = (first, second, greater) => {
  firstValue = parseInt(first["value"].replace(/\./g, ""))
  secondValue = parseInt(second["value"].replace(/\./g, ""))

  if(greater){
    if(firstValue > secondValue) {
      $(first["class"]).addClass("better-value");
    } else if(firstValue < secondValue){
      $(second["class"]).addClass("better-value");
    } else {
      $(first["class"]).addClass("tie-value");
      $(second["class"]).addClass("tie-value");
    }
  } else {
    if(firstValue < secondValue) {
      $(first["class"]).addClass("better-value");
    } else if(firstValue > secondValue){
      $(second["class"]).addClass("better-value");
    } else {
      $(first["class"]).addClass("tie-value");
      $(second["class"]).addClass("tie-value");
    }
  }
}

const populateTable = (firstStock, secondStock) => {
  firstHash = {};
  secondHash = {};

  $(".company-code#company-code-stock-1").append(firstStock["code"]);
  $(".company-code#company-code-stock-2").append(secondStock["code"]);

  $(".company-name#company-name-stock-1").append(firstStock["name"]);
  $(".company-name#company-name-stock-2").append(secondStock["name"]);

  $(".company-value#company-value-stock-1").append(`R$ ${firstStock["value"]}`);
  $(".company-value#company-value-stock-2").append(`R$ ${secondStock["value"]}`);
  firstHash["value"] = firstStock["value"];
  firstHash["class"] = ".company-value#company-value-stock-1"
  secondHash["value"] = secondStock["value"];
  secondHash["class"] = ".company-value#company-value-stock-2"
  compareValues(firstHash, secondHash, true);

  $(".company-patrimony#company-patrimony-stock-1").append(`R$ ${firstStock["patrimony"]}`);
  $(".company-patrimony#company-patrimony-stock-2").append(`R$ ${secondStock["patrimony"]}`);
  firstHash["value"] = firstStock["patrimony"];
  firstHash["class"] = ".company-patrimony#company-patrimony-stock-1"
  secondHash["value"] = secondStock["patrimony"];
  secondHash["class"] = ".company-patrimony#company-patrimony-stock-2"
  compareValues(firstHash, secondHash, true);

  $(".company-debt#company-debt-stock-1").append(`R$ ${firstStock["debt"]}`);
  $(".company-debt#company-debt-stock-2").append(`R$ ${secondStock["debt"]}`);
  firstHash["value"] = firstStock["debt"];
  firstHash["class"] = ".company-debt#company-debt-stock-1"
  secondHash["value"] = secondStock["debt"];
  secondHash["class"] = ".company-debt#company-debt-stock-2"
  compareValues(firstHash, secondHash, false);

  $(".comparation-card").show();
}

document.addEventListener('DOMContentLoaded', () => {
  parser = new DOMParser();
  let baseUrl = "https://cors-anywhere.herokuapp.com/www.fundamentus.com.br/detalhes.php?papel="

  let firstStock = {};
  let secondStock = {};

  $(".compare-btn").on("click", function(){
    firstStockInput = $("#stock-1").val();
    secondStockInput = $("#stock-2").val();

    if(firstStock == ""  || secondStock == ""){
      return;
    }

    let firstReady = false;
    let secondReady = false;

    fetch(`${baseUrl}${firstStockInput}`).then(response => response.text()).then(data => {
      doc = parser.parseFromString(data, "text/html");

      firstStock["code"] = doc.querySelectorAll(".conteudo table tr td span")[2].innerHTML;
      firstStock["name"] = doc.querySelectorAll(".conteudo table tr td span")[14].innerHTML;
      firstStock["value"] = doc.querySelectorAll(".conteudo table tr td span")[38].innerHTML;
      firstStock["patrimony"] = doc.querySelectorAll(".conteudo table tr td span")[150].innerHTML;
      firstStock["debt"] = doc.querySelectorAll(".conteudo table tr td span")[138].innerHTML;

      firstReady = true;
      comparisonReady(firstReady, firstStock, secondReady, secondStock);
    })

    fetch(`${baseUrl}${secondStockInput}`).then(response => response.text()).then(data => {
      doc = parser.parseFromString(data, "text/html");

      secondStock["code"] = doc.querySelectorAll(".conteudo table tr td span")[2].innerHTML;
      secondStock["name"] = doc.querySelectorAll(".conteudo table tr td span")[14].innerHTML;
      secondStock["value"] = doc.querySelectorAll(".conteudo table tr td span")[38].innerHTML;
      secondStock["patrimony"] = doc.querySelectorAll(".conteudo table tr td span")[150].innerHTML;
      secondStock["debt"] = doc.querySelectorAll(".conteudo table tr td span")[138].innerHTML;

      secondReady = true;
      comparisonReady(firstReady, firstStock, secondReady, secondStock);
    })
  });
});
