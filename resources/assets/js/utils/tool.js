import { Message,MessageBox, Notification } from 'element-ui';
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

/**
 * 询问框
 * @author 晚黎
 * @date   2017-03-14T14:52:57+0800
 * @param  {[type]}                 message       [description]
 * @param  {String}                 title         [description]
 * @param  {String}                 type          [description]
 * @param  {String}                 confirmButton [description]
 * @param  {String}                 cancelButton  [description]
 * @return {[type]}                               [description]
 */
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

export function notification_success(message) {
  return new Promise((resolve, reject) => {
    Notification.success({
      title: '成功',
      message: message
    })
  }) 
}

export function notification_error(message) {
  return new Promise((resolve, reject) => {
    Notification.error({
      title: '错误',
      message: message
    })
  }) 
}