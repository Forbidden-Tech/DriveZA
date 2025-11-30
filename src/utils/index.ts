export function createPageUrl(pageName: string): string {
  const routes: Record<string, string> = {
    'Home': '/',
    'Browse': '/Browse',
    'SellCar': '/SellCar',
    'CarDetails': '/CarDetails',
  };
  
  return routes[pageName] || `/${pageName}`;
}

