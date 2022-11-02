'use strict';

 // 3 функции для работы с куками, установка\получение\удаление(последнее в данном случае не пригодилось)
 function setCookie(name,value,days) {
  let expires = "";
  if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


const URL_LIST = ['index'] // Массив ссылок, для задания относительных путей, в строке CUR_URL нужно убрать location.protocol + '//' +
const PSW_LIST = ['12345', '23456', '34567', '45678'] // Массив паролей
const DIMMER = document.querySelector('.dimmer') // Элемент - заглушка
const POPUP_ELEM = document.querySelector('.popup_wrapper') // Сам элемент "формы"
const BLOCK_SCROLL = true //Опция блока скролла, если установить false скролл страницы не заблокируется.
const CUR_URL = document.location.href; // Переменная содержащая путь к странице относительно корня сайта
let cookie_name = "psw_confirmed" + location.pathname; // Для каждой страницы кука получится своя
console.log(CUR_URL)
function setPageAccess(name){ // Функция отрабаывающая в случае успешной валидации пароля, скрывает все ненужные элементы, удаляет скрипт, дпишет куку
  setCookie(name,'Y',1)
  POPUP_ELEM.style.display = 'none'
  DIMMER.style.display = 'none'
  document.oncontextmenu = cmenu; function cmenu() { return true; }
  document.onkeydown = function(e) {
      if(event.keyCode == 123) {
          return true;
      }
      if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
          return true;
      }
      if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
          return true;
      }
      if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
          return true;
      }
  }
  if(BLOCK_SCROLL){
      document.onscroll = function () { return true };
  }

  document.getElementById("validate_password").remove()
}
function validatePassword(elem) { // Функция проверяющая value инпута на соответствие паролю
  let psw = elem.parentElement.querySelector('input[type=password').value
  for(let i = 0; i < PSW_LIST.length; i++){
      if(psw === PSW_LIST[i]){
          console.log("TRUE")
          setPageAccess(cookie_name)
          return true
      }
  }
  console.log("FALSE")
  return false
}

document.addEventListener('DOMContentLoaded', function(){ // по загрузке страницы делегируем простую проверку на существование куки
  for(let i = 0; i < URL_LIST.length; i++){
      if(CUR_URL.indexOf(URL_LIST[i]) > -1){
          if(!getCookie(cookie_name)){
              POPUP_ELEM.style.display = 'block'
              document.oncontextmenu = cmenu; function cmenu() { return false; }
              document.onkeydown = function(e) {
                  if(event.keyCode == 123) {
                      return false;
                  }
                  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
                      return false;
                  }
                  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
                      return false;
                  }
                  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
                      return false;
                  }
              }
              if(BLOCK_SCROLL) {
                  document.onscroll = function () {
                      window.scrollTo(0, 0);
                  };
              }
              DIMMER.style.display = 'block'
          } else{
              document.getElementById("validate_password").remove()
          }
      }
  }

});
