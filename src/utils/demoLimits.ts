export class DemoLimits {
  private static readonly MAX_PRODUCTS_PER_SESSION = 5;
  private static readonly MAX_CART_ITEMS = 10;
  private static readonly MAX_OPERATIONS_PER_MINUTE = 15;
  private static readonly SESSION_KEY = 'demo_session_data';
  
  private static getSessionData() {
    const data = localStorage.getItem(this.SESSION_KEY);
    if (!data) {
      const newSession = {
        productCount: 0,
        operations: [],
        startTime: Date.now()
      };
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(newSession));
      return newSession;
    }
    return JSON.parse(data);
  }
  
  private static updateSessionData(data: any) {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(data));
  }
  
  static canAddToCart(currentCartSize: number): { allowed: boolean; message?: string } {
    if (currentCartSize >= this.MAX_CART_ITEMS) {
      return {
        allowed: false,
        message: `Demo limit: Maximum ${this.MAX_CART_ITEMS} items in cart`
      };
    }
    
    return { allowed: true };
  }
  
  static canCreateProduct(): { allowed: boolean; message?: string } {
    const session = this.getSessionData();
    
    if (session.productCount >= this.MAX_PRODUCTS_PER_SESSION) {
      return {
        allowed: false,
        message: `Demo limit: Maximum ${this.MAX_PRODUCTS_PER_SESSION} products per session`
      };
    }
    
    return { allowed: true };
  }
  
  static canPerformOperation(): { allowed: boolean; message?: string } {
    const session = this.getSessionData();
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    
    //pilisce vecchie operazioni
    session.operations = session.operations.filter((time: number) => time > oneMinuteAgo);
    
    if (session.operations.length >= this.MAX_OPERATIONS_PER_MINUTE) {
      return {
        allowed: false,
        message: 'Demo limit: Too many operations. Please wait a moment.'
      };
    }
    
    return { allowed: true };
  }
  
  static recordProductCreation() {
    const session = this.getSessionData();
    session.productCount++;
    this.updateSessionData(session);
  }
  
  static recordOperation() {
    const session = this.getSessionData();
    session.operations.push(Date.now());
    this.updateSessionData(session);
  }
  
  static resetSession() {
    localStorage.removeItem(this.SESSION_KEY);
  }
    static getSessionStats() {
    const session = this.getSessionData();
    return {
      productsCreated: session.productCount,
      maxProducts: this.MAX_PRODUCTS_PER_SESSION,
      maxCartItems: this.MAX_CART_ITEMS,
      operationsThisMinute: session.operations.filter((time: number) => time > Date.now() - 60000).length,
      maxOperationsPerMinute: this.MAX_OPERATIONS_PER_MINUTE
    };
  }
}
