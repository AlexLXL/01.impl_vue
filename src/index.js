import {initMixin} from "./init";
import {renderMixin} from "./render";
import {lifCycleMixin} from "./lifeCycle";

function Vue(option) {
    this._init(option);
}

initMixin(Vue);
renderMixin(Vue);
lifCycleMixin(Vue);

export default Vue;
