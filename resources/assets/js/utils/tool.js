import { Message,MessageBox } from 'element-ui';
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

export function confirm(message,title = '提示',type = 'info',confirmButton = '确定',cancelButton = '取消') {
    return new Promise((resolve, reject) => {
        MessageBox.confirm(message, title,{
            confirmButtonText: confirmButton,
            cancelButtonText: cancelButton,
            type: type,
        }).then(() => {
          resolve();
        }).catch(() => {
          reject();
        }); 
    })
}