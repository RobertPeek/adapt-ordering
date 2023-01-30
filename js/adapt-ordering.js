import components from 'core/js/components';
import OrderingModel from './OrderingModel';
import OrderingView from './OrderingView';
import 'libraries/jquery-ui.min';

export default components.register('ordering', {
    model: OrderingModel,
    view: OrderingView
});