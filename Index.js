let currentId = 0;

var Question = function (owner, baseValue, number) {
  this.questionId = currentId = currentId + 1;
  this.ownerTable = owner;
  this.baseValue = baseValue;
  this.number = number;
  this.result = baseValue * number;
  this.answer = ko.observable("");
  let self = this;

  this.isCorrect = ko.computed(function () {
    return self.answer() == self.result;
  });

  this.isInvalid = ko.computed(function () {
    if (self.answer() === "") {
      return false;
    }
    return self.isCorrect() === false;
  });

  this.isCurrentQuestion = ko.computed(function () {
    return self.ownerTable.currentQuestionId() === self.questionId;
  });

  this.calculationStatus = ko.computed(function () {
    if (self.isCorrect()) {
      return "alert alert-success";
    } else if (self.isInvalid()) {
      return "alert alert-danger";
    } else if (owner.currentQuestionId() === self.questionId) {
      return "alert alert-primary";
    } else {
      return "alert alert-dark";
    }
  });

  this.question = baseValue + " x " + number;
};

function shuffle(array) {
  //https://bost.ocks.org/mike/shuffle/
  var copy = [],
    n = array.length,
    i;

  // While there remain elements to shuffle…
  while (n) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * n--);

    // And move it to the new array.
    copy.push(array.splice(i, 1)[0]);
  }

  return copy;
}

var TableComputations = function (baseValue, randomize, owner) {
  this.tableId = currentId = currentId + 1;
  this.baseValue = baseValue;
  this.computations = [];
  this.currentQuestionId = ko.observable(1);
  this.owner = owner;
  self = this;

  for (let i = 1; i <= 10; i++) {
    this.computations.push(new Question(this, baseValue, i));
  }
  if (randomize) {
    this.computations = shuffle(this.computations);
  }
  this.currentQuestionId(this.computations[0].questionId);

  this.isActiveComputation = ko.computed(function () {
    const res = self.owner.activeTableId() === self.tableId;
    return res;
  });
};

var ComputationsData = function () {
  this.activeTableId  = ko.observable(0);
  let firstItem = new TableComputations(2, false, this);
  this.activeTableId(firstItem.tableId);
  this.tables = [
    firstItem,
    new TableComputations(2, true, this),
    new TableComputations(3, false, this),
    new TableComputations(3, true, this),
    new TableComputations(4, false, this),
    new TableComputations(3, true, this),
  ];
};

// The view model is an abstract description of the state of the UI, but without any knowledge of the UI technology (HTML)
var viewModel = {
  data: new ComputationsData(),
  showRenderTimes: ko.observable(false),
};

document.addEventListener("DOMContentLoaded", function () {
  console.log("start binding");
  ko.applyBindings(viewModel);
});
