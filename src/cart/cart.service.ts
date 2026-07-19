import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

export interface CartItem {
  productId: string;
  title: string;
  price: string;
  quantity: number;
  imageUrl: string;
  color: string;
}

@Injectable()
export class CartService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private getCartKey(userId: string): string {
    return `cart_${userId}`;
  }

  async getCart(userId: string): Promise<CartItem[]> {
    const cart = await this.cacheManager.get<CartItem[]>(this.getCartKey(userId));
    return cart || [];
  }

  async addToCart(userId: string, item: CartItem): Promise<CartItem[]> {
    const cart = await this.getCart(userId);
    
    const existingItemIndex = cart.findIndex(i => i.productId === item.productId);
    
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += item.quantity;
    } else {
      cart.push(item);
    }
    
    // Cache for 7 days (in milliseconds)
    await this.cacheManager.set(this.getCartKey(userId), cart, 604800000); 
    
    return cart;
  }

  async removeFromCart(userId: string, productId: string): Promise<CartItem[]> {
    const cart = await this.getCart(userId);
    const updatedCart = cart.filter(item => item.productId !== productId);
    await this.cacheManager.set(this.getCartKey(userId), updatedCart, 604800000);
    return updatedCart;
  }

  async clearCart(userId: string): Promise<void> {
    await this.cacheManager.del(this.getCartKey(userId));
  }
}
