var Computation = function(baseValue, number) {
    this.baseValue = baseValue;
    this.number = number;
    this.result = baseValue * number;
    this.answer;

    // this.correct = ko.computed(function() {
    //     // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
    //     return this.answer === result;
    // }, this);
}

// The view model is an abstract description of the state of the UI, but without any knowledge of the UI technology (HTML)
var viewModel = {
    computations: [
        new Computation(2, 1),
        new Computation(2, 2),
        ],
    showRenderTimes: ko.observable(false)
};


document.addEventListener('DOMContentLoaded', function() {
    console.log("start binding");
    ko.applyBindings(viewModel);
 });
 