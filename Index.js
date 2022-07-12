var Computation = function (owner, baseValue, number) {
  this.owner = owner;
  this.baseValue = baseValue;
  this.number = number;
  this.result = baseValue * number;
  this.answer = ko.observable('');
  let self = this;

  this.isCorrect = ko.computed(function () {
    console.log("isCorrect", self.answer());
    return self.answer() == self.result;
  });

  this.calculationStatus = ko.computed(function () {
    if (self.isCorrect()) {
      return "alert alert-success";
    } else if (owner.currentQuestion() < number) {
      return "alert alert-dark";
    } else if (owner.currentQuestion() === number) {
      return "alert alert-primary";
    } else {
      return "alert alert-danger";
    }
  });

  this.question = baseValue + " x " + number;

  // this.correct = ko.computed(function() {
  //     // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
  //     return this.answer === result;
  // }, this);
};

var Computations = function (baseValue) {
  this.computations = [];
  this.currentQuestion = ko.observable(1);

  for (let i = 1; i <= 10; i++) {
    this.computations.push(new Computation(this, baseValue, i));
  }
};

// The view model is an abstract description of the state of the UI, but without any knowledge of the UI technology (HTML)
var viewModel = {
  table: new Computations(2),
  showRenderTimes: ko.observable(false),
};

document.addEventListener("DOMContentLoaded", function () {
  console.log("start binding");
  ko.applyBindings(viewModel);
});
