import Adapt from 'core/js/adapt';
import a11y from 'core/js/a11y';
import QuestionView from 'core/js/views/questionView';

class OrderingView extends QuestionView {

    events() {
        return {
            'click .ordering-item__icon-up': 'onItemUp',
            'click .ordering-item__icon-down': 'onItemDown',
            'sortupdate .sortable': 'onSortUpdate'
        };
    }

    onItemUp(event) {
        var currentItem = this.getCurrentItem($(event.currentTarget));

        currentItem.insertBefore(currentItem.prev());

        this.updateControls();
    }

    onItemDown(event) {
        var currentItem = this.getCurrentItem($(event.currentTarget));

        currentItem.insertAfter(currentItem.next());

        this.updateControls();
    }

    onSortUpdate(event) {
        this.updateControls();
    }

    getCurrentItem(item) {
        var $item = item.parent().parent();
        return $item;
    }

    updateControls() {
        // Reset
        this.$('.ordering-item__icon').removeClass('is-disabled').removeAttr('tabindex').removeAttr('aria-disabled');

        this.$('.ordering-item').find('.ordering-item__icon-up').attr('aria-label', a11y.normalize(Adapt.course.get('_globals')._components._ordering.ariaUpLabel));
        this.$('.ordering-item').find('.ordering-item__icon-down').attr('aria-label', a11y.normalize(Adapt.course.get('_globals')._components._ordering.ariaDownLabel));

        this.$('.ordering-item').first().find('.ordering-item__icon-up').addClass('is-disabled').attr('tabindex', '-1').attr('aria-disabled', 'true');
        this.$('.ordering-item').last().find('.ordering-item__icon-down').addClass('is-disabled').attr('tabindex', '-1').attr('aria-disabled', 'true');
    }

    //method for setting up questions before rendering
    setupQuestion() {
        this.model.setupRandomisation();
    }

    // methods after the question is rendered
    onQuestionRendered() {
        this.setReadyStatus();
        this.showMarking();
        //first time html structure
        this.model.set('_itemListHtml', this.$(".ordering__container").html());
        this.model.set('_itemListJqueryObject', this.$(".ordering__container"));
        this.sortItemsInitialize();
        this.updateControls();
    }

    sortItemsInitialize(event) {
        if (this.model.get("_isSubmitted")) return;
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        this.$('.sortable').sortable({
            axis: 'y',
            cursor: 'grabbing',
            sort: function (event, ui) {
                /*
                * allow for the page scroll when dragging an item
                * doesn't work with sortable's 'containment' or 'revert' properties
                */
                var $target = $(event.target);
                if (!/html|body/i.test($target.offsetParent()[0].tagName)) {
                    var newTop = event.pageY - $target.offsetParent().offset().top - (ui.helper.outerHeight(true) / 2);
                    ui.helper.css({ 'top': newTop + 'px' });
                }
            }
        });
    }

    disableQuestion() {
        this.$('.sortable').sortable("disable");
    }

    enableQuestion() {
        this.$('.sortable').sortable("enable");
    }

    // Blank method to add functionality for when the user cannot submit
    // Could be used for a popup or explanation dialog/hint
    onCannotSubmit() { }

    // This is important and should give the user feedback on how they answered the question
    // Normally done through ticks and crosses by adding classes
    showMarking() {
        this.$('.ordering-item').addClass('is-disabled');

        if (!this.model.get('_canShowMarking')) return;
        var $items = this.$('.ordering-item');
        _.each(this.model.get('_isItemOnCorrectPlace'), function (isCorrectItem, index) {
            var $item = $items.eq(index);
            $item.removeClass('is-correct is-incorrect').addClass(isCorrectItem ? 'is-correct' : 'is-incorrect')
        }, this);
    }

    showCorrectAnswer() {
        var listElements = [];
        var correctAnswer = [];

        var cloneElement = this.model.get('_itemListJqueryObject').children().clone();
        var items = _.sortBy(this.model.get('_items'), 'position');

        for (var i = 0, l = items.length; i < l; i++) {
            correctAnswer.push(items[i].id);
        }

        _.each(cloneElement, function (item, index) {
            var cloneID = item.dataset.itemid;

            for (var i = 0, l = items.length; i < l; i++) {
                if (cloneID == correctAnswer[i]) {
                    listElements[i] = item;
                }
            }

        }, this);

        this.model.get('_itemListJqueryObject').html(listElements);
    }

    hideCorrectAnswer() {
        this.model.get('_itemListJqueryObject').html(this.model.get('userSortedList') || this.model.get('_itemListHtml'));
    }

    // Used by the question view to reset the look and feel of the component.
    resetQuestion() {
        this.$('.ordering-item').removeClass('is-disabled');
        if (this.model.get('_itemListHtml')) {
            this.model.get('_itemListJqueryObject').html(this.model.get('_itemListHtml'));
        }
    }

    /**
     * used by adapt-contrib-spoor to get the user's answers in the format required by the cmi.interactions.n.student_response data field
     * returns the user's answers as a string in the format "1,5,2"
     */
    getResponse() {
        var userAnswer = this.model.get('_userAnswer');
        var responses = [];
        for (var i = 0, count = userAnswer.length; i < count; i++) {
            responses.push((i + 1) + "." + (userAnswer[i])); // convert from 0-based to 1-based counting
        };
        return responses.join('#');
    }

    /**
     * Used by adapt-contrib-spoor to get the type of this question in the format required by the cmi.interactions.n.type data field
     */
    getResponseType() {
        return "matching";
    }
}

OrderingView.template = 'ordering';

export default OrderingView;
