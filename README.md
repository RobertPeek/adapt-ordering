# adapt-ordering

A list of items are presented to the learner, which they will have to put into order using up and down arrows on each item. Upon submission, feedback is provided via the [**Tutor** extension](https://github.com/adaptlearning/adapt-contrib-tutor), if installed. Feedback can be provided for correct, incorrect and partially correct answers. The number of attempts allowed may be configured.

## Installation

This plugin must be installed manually.  

## Settings overview

The attributes listed below are used in *components.json* to configure **Ordering**, and are properly formatted as JSON in [example.json](https://github.com/RobertPeek/adapt-ordering/blob/master/example.json).

### Attributes

In addition to the attributes specifically listed below, [*question components*](https://github.com/adaptlearning/adapt_framework/wiki/Core-Plug-ins-in-the-Adapt-Learning-Framework#question-components) can implement the following sets of attributes:   
+ [**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. They have no default values. Like the attributes below, their values are assigned in *components.json*.
+ [**core buttons**](https://github.com/adaptlearning/adapt_framework/wiki/Core-Buttons): Default values are found in *course.json*, but may be overridden by **Ordering's** model in *components.json*.

**_component** (string): This value must be: `ordering`.

**_classes** (string): CSS class name to be applied to **Ordering**’s containing `div`. The class must be predefined in one of the Less files. Separate multiple classes with a space.

**_layout** (string): This defines the horizontal position of the component in the block. Acceptable values are `full`, `left` or `right`.  

**instruction** (string): This optional text appears above the component. It is frequently used to
guide the learner’s interaction with the component.  

**_attempts** (integer): This specifies the number of times a learner is allowed to submit an answer. The default is `1`.    

**_shouldDisplayAttempts** (boolean): Determines whether or not the text set in **remainingAttemptText** and **remainingAttemptsText** will be displayed. These two attributes are part of the [core buttons](https://github.com/adaptlearning/adapt_framework/wiki/Core-Buttons) attribute group. The default is `false`.  

**_isRandom** (boolean): Setting this value to `true` will cause the `_items` to appear in a random order each time the component is loaded. The default is `false`.   

**\_hasItemScoring** (boolean): When `false`, this question scores 0 for incorrect and `_questionWeight` for correct. When `true`, this question scores by summing the `_score` of the correctly placed items.

**_questionWeight** (number): A number which reflects the significance of the question in relation to the other questions in the course. This number is used in calculations of the final score reported to the LMS.  

**_canShowModelAnswer** (boolean): Setting this to `false` prevents the [**_showCorrectAnswer** button](https://github.com/adaptlearning/adapt_framework/wiki/Core-Buttons) from being displayed. The default is `true`.

**_canShowFeedback** (boolean): Setting this to `false` disables feedback, so it is not shown to the user. The default is `true`.

**_canShowMarking** (boolean): Setting this to `false` prevents ticks and crosses being displayed on question completion. The default is `true`.

**_recordInteraction** (boolean) Determines whether or not the learner's answers will be recorded to the LMS via cmi.interactions. Default is `true`. For further information, see the entry for `_shouldRecordInteractions` in the README for [adapt-contrib-spoor](https://github.com/adaptlearning/adapt-contrib-spoor).

**_items** (array): Each *item* represents one item in the list and contains values for **id**, **text**, **position** and **_score**.  

>**id** (number): Sortable Item Id naming convention.  

>**text** (string): This string of the settings contains the text to sentence.  

>**position** (number): Correct position(place) of the item.

>**_score** (number): The item score used if **_hasItemScoring** is `true`.  

**_feedback** (object): If the [**Tutor** extension](https://github.com/adaptlearning/adapt-contrib-tutor) is enabled, these various texts will be displayed depending on the submitted answer. **_feedback**
contains values for three types of answers: **correct**, **_incorrect**, and **_partlyCorrect**. Some attributes are optional. If they are not supplied, the default that is noted below will be used.

>**correct** (string): Text that will be displayed when the submitted answer is correct.  

>**_incorrect** (object): Texts that will be displayed when the submitted answer is incorrect. It contains values that are displayed under differing conditions: **final** and **notFinal**.

>>**final** (string): Text that will be displayed when the submitted answer is incorrect and no more attempts are permitted.

>>**notFinal** (string): Text that will be displayed when the submitted answer is incorrect while more attempts are permitted. This is optional&mdash;if you do not supply it, the **_incorrect.final** feedback will be shown instead.

>**_partlyCorrect** (object): Texts that will be displayed when the submitted answer is partially correct. It contains values that are displayed under differing conditions: **final** and **notFinal**.  

>>**final** (string): Text that will be displayed when the submitted answer is partly correct and no more attempts are permitted. This is optional&mdash;if you do not supply it, the **_incorrect.final** feedback will be shown instead.  

>>**notFinal** (string): Text that will be displayed when the submitted answer is partly correct while more attempts are permitted. This is optional&mdash;if you do not supply it, the **_incorrect.notFinal** feedback will be shown instead.  

### Accessibility
**Ordering** has been assigned a label using the [aria-label](https://github.com/adaptlearning/adapt_framework/wiki/Aria-Labels) attribute: **ariaRegion**. This label is not a visible element. It is utilized by assistive technology such as screen readers. Should the region's text need to be customised, it can be found within the **globals** object in [*properties.schema*](https://github.com/RobertPeek/adapt-ordering/blob/master/properties.schema).   
<div float align=right><a href="#top">Back to Top</a></div>

----------------------------
**Version number:**  1.0.0
**Framework versions:** 5.20.1+
**Author / maintainer:** Robert Peek
**Accessibility support:** WAI AA
**RTL support:** yes
**Cross-platform coverage:** Chrome, Chrome for Android, Firefox (ESR + latest version), Edge 12, IE 11, Safari iOS 9+10, Safari OS X 12