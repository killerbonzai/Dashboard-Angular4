import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  disableCssAnimations = function() {
    return browser.executeScript("document.body.className += ' notransition';");
  };

  disableJquery = function() {
    return browser.executeScript("$.fx.off = true;");
  };

  toggleSideMenu(){
    return element(by.className("sidebar-toggle")).click();
  }

  getBodyClass(){
    return element(by.tagName("body")).getAttribute("class");
  }

  getInfoBoxes(){
    return element.all(by.className('info-box'));
  }

  clickLink(linkname: string){
    return element(by.partialLinkText(linkname)).click();
  }

  getBoxes(){
    return element.all(by.className('box'));
  }

  removeActiveWidget(widget: string){
    return element(by.partialLinkText('Aktive Widgets')).element(by.xpath('ancestor::li')).element(by.partialLinkText(widget)).element(by.tagName('i')).click();
  }

  sideMenuLinkClasses(linkname: string){
    return element(by.partialLinkText(linkname)).element(by.xpath('ancestor::li')).getAttribute('class');
  }

  getDragAndDropSections(){
    return element.all(by.css('section .connectedSortable'));
  }

  getNgComponentDiv(component: string){
    var xpath = '//div[@' + component + ']';
    return element.all(by.xpath(xpath));
  }

  getHTMLTag(tag: string){
    return element.all(by.xpath('//'+tag));    
  }
}
