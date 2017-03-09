import { Message } from 'element-ui';
/**
 * Message 消息提示
 * @author 晚黎
 * @date   2017-03-09T10:58:10+0800
 * @param  {[type]}                 str  [description]
 * @param  {[type]}                 icon [description]
 * @return {[type]}                      [description]
 */
export function message(message,type = 'info',showClose = true) {
    Message({
      showClose: showClose,
      message: message,
      type: type
    }); 
}