import QuestionModel from 'core/js/models/questionModel';

export default class OrderingModel extends QuestionModel {

    init() {
        super.init();
    }

    restoreUserAnswers() {
        if (!this.get("_isSubmitted")) return;
        var userAnswer = this.get("_userAnswer");
        var itemArray = [];
        var items = _.sortBy(this.get("_items"));
        _.each(userAnswer, function (item, index) {
            itemArray[index] = items[item - 1];
        }, this);
        this.set("_items", itemArray);
        this.setQuestionAsSubmitted();
        this.markQuestion();
        this.setScore();
        this.setupFeedback();
    }

    setupRandomisation() {
        if (this.get('_isRandom') && this.get('_isEnabled')) {
            this.set("_items", _.shuffle(this.get("_items")));
        }
    }

    // check if the user is allowed to submit the question
    canSubmit() {
        return true;
    }

    // This is important for returning or showing the users answer
    // This should preserve the state of the users answers
    storeUserAnswer() {
        var userAnswer = [];
        var tempArray = [];
        var items = _.sortBy(this.get('_items'), 'id');
        var userSortedList = this.get('_itemListJqueryObject').children();
        this.set("userSortedList", userSortedList);
        _.each(userSortedList, function (item, index) {
            userAnswer.push(parseInt(item.dataset.itemid));
            tempArray.push(items[parseInt(item.dataset.itemid) - 1]);
        });
        this.set({
            '_items': tempArray,
            '_userAnswer': userAnswer
        });
    }

    isCorrect() {
        var userAnswer = this.get('_userAnswer'),
            itemsSorted = _.sortBy(this.get("_items"), 'id'),
            items = this.get("_items"),
            numberOfCorrectAnswers = 0,
            numberOfIncorrectAnswers = 0,
            itemScoresTotal = 0,
            itemScoresMax = 0,
            isItemOnCorrectPlace = [];

        _.each(userAnswer, function (item, index) {
            const currentItem = itemsSorted[index];
            
            if (currentItem.position == item) {
                numberOfCorrectAnswers++;
                itemScoresTotal += currentItem._score ? currentItem._score : 1;
                isItemOnCorrectPlace.push(true);
            } else {
                numberOfIncorrectAnswers++;
                isItemOnCorrectPlace.push(false);
            }

            itemScoresMax += currentItem._score ? currentItem._score : 1;
        }, this);

        // store on the model
        this.set({
            '_isItemOnCorrectPlace': isItemOnCorrectPlace,
            '_numberOfCorrectAnswers': numberOfCorrectAnswers,
            '_numberOfIncorrectAnswers': numberOfIncorrectAnswers,
            '_itemScoresTotal': itemScoresTotal,
            '_itemScoresMax': itemScoresMax
        });

        // Check if correct answers matches correct items and there are no incorrect selections
        var answeredCorrectly = (numberOfCorrectAnswers === items.length) && (numberOfIncorrectAnswers === 0);
        return answeredCorrectly;
    }

    setScore() {
        var questionWeight = this.get("_questionWeight");
        var answeredCorrectly = this.get('_isCorrect');
        var score = answeredCorrectly ? questionWeight : 0;
        this.set('_score', score);
    }

    get score() {
        if (!this.get('_hasItemScoring')) return super.score;
        
        this.get('_isCorrect'); // calculate scores
        return this.get('_itemScoresTotal');
    }

    get maxScore() {
        if (!this.get('_hasItemScoring')) return super.maxScore;
        
        this.get('_isCorrect'); // calculate scores
        return this.get('_itemScoresMax');
    }

    get minScore() {
        return 0;
    }

    isPartlyCorrect() {
        return this.get('_numberOfCorrectAnswers') >= this.get('_items').length / 2;
    }

    /*resetItems() {
        if(!this.get('_previousItems')) return;
        this.set('_items', this.get('_previousItems'));
    },*/

    resetUserAnswer() {
        this.set({ _userAnswer: [] });
    }
}