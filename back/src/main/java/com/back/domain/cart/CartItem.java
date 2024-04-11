package com.back.domain.cart;

import com.back.domain.product.Product;
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ToString(exclude="cart")
@Table(name = "tbl_cart_item", indexes = {
        @Index(columnList = "cart_cno", name = "idx_cartitem_cart"),
        @Index(columnList = "product_pno, cart_cno", name="idx_cartitem_pno_cart")
})
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cino;

    @ManyToOne
    @JoinColumn(name = "product_pno")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "cart_cno")
    private Cart cart;
                //수량
    private int qty;

    public void changeQty(int qty){
        this.qty = qty;
    }

}