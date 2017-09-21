import { AppPage } from './app.po';

describe('open-traffic-data.web App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage(); 
    page.navigateTo();
  });

  it('check that all layout components are displayed', () => {
    expect(page.getHTMLTag('app-root').count()).toEqual(1);
    expect(page.getHTMLTag('app-topmenu').count()).toEqual(1);
    expect(page.getHTMLTag('app-sidemenu').count()).toEqual(1);
    expect(page.getHTMLTag('app-widgetarea').count()).toEqual(1);
    expect(page.getHTMLTag('app-footer').count()).toEqual(1);
    expect(page.getHTMLTag('app-controlsidebar').count()).toEqual(1);
  });

  it('test sidebar toggle', () => {
    page.toggleSideMenu();
    expect(page.getBodyClass()).toContain('sidebar-collapse');
    page.toggleSideMenu();
    expect(page.getBodyClass()).not.toContain('sidebar-collapse');
  });



  it('test sidemenu', () => {
    page.disableCssAnimations();
    page.disableJquery();

    page.clickLink('Aktive Widgets');
    expect(page.sideMenuLinkClasses('Aktive Widgets')).toContain('active');
    page.clickLink('Aktive Widgets');
    expect(page.sideMenuLinkClasses('Aktive Widgets')).not.toContain('active');    
    page.clickLink('Widget Kartotek');
    expect(page.sideMenuLinkClasses('Widget Kartotek')).toContain('active');    
    page.clickLink('Widget Kartotek');
    expect(page.sideMenuLinkClasses('Widget Kartotek')).not.toContain('active');        
    page.clickLink('Dashboards');
    expect(page.sideMenuLinkClasses('Dashboards')).toContain('active');        
    page.clickLink('Widget Kartotek');
    expect(page.sideMenuLinkClasses('Widget Kartotek')).toContain('active');        
    page.clickLink('Dashboard');
    expect(page.sideMenuLinkClasses('Dashboards')).toContain('active');    
  });

  it('test widget functionality (add and remove a widget)', () => {
    page.disableCssAnimations();
    page.disableJquery();

    page.clickLink('Widget Kartotek');
    page.clickLink('Stationskort');
    expect(page.getBoxes().count()).toEqual(2);
    page.clickLink('Aktive Widgets');
    page.removeActiveWidget('Stationskort');
    expect(page.getBoxes().count()).toEqual(1); 
    
    page.clickLink('Widget Kartotek');    
    page.clickLink('Test Boks');
    expect(page.getBoxes().count()).toEqual(1);
    page.clickLink('Aktive Widgets');
    page.removeActiveWidget('Test Boks');
    expect(page.getBoxes().count()).toEqual(0);
  });

  it('multiple widgets on dashboard at the same time', () => {
    page.disableCssAnimations();
    page.disableJquery();

    page.clickLink('Widget Kartotek');
    page.clickLink('Stationskort');
    expect(page.getBoxes().count()).toEqual(2);
    page.clickLink('Test Boks');
    expect(page.getBoxes().count()).toEqual(2);
  });

  it('check number of drag and drop areas for widgets', () => {
    expect(page.getDragAndDropSections().count()).toEqual(2);
  });

  it('check widgets by ng components', () => {
    page.disableCssAnimations();
    page.disableJquery();

    page.clickLink('Widget Kartotek');
    page.clickLink('Stationskort');
    expect(page.getNgComponentDiv('app-stationskort').count()).toBeGreaterThanOrEqual(1);
  });
});
