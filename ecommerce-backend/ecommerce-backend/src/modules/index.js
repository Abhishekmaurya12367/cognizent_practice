
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// ==========================================
// 1. USER
// ==========================================

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    // thid is my database where i am practicing the code line by line otherwise there is lot of other thing 
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    phone: String,
    role: {
        type: String,
        enum: ["admin", "customer"],
        default: "customer"
    },
    accountStatus: {
        type: String,
        enum: ["active", "blocked", "suspended"],
        default: "active"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    emailVerificationToken: {
        type: String,
        select: false
    },
    emailVerificationExpires: Date,
    passwordResetToken: {
        type: String,
        select: false
    },
    passwordResetExpires: Date,
    lastLogin: Date,
    loginAttempts: {
        type: Number,
        default: 0,
        select: false
    },
    lockUntil: {
        type: Date,
        select: false
    },
    avatar: String
}, { timestamps: true });


// ==========================================
// 2. ADDRESS
// ==========================================

const addressSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: String,
    landmark: String,
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    addressType: {
        type: String,
        enum: ["home", "work", "other"],
        default: "home"
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

addressSchema.index({ userId: 1, isDefault: 1 });


// ==========================================
// 3. CATEGORY
// ==========================================

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    parentId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
    description: String,
    image: String,
    isActive: {
        type: Boolean,
        default: true
    },
    sortOrder: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

categorySchema.index({ parentId: 1, isActive: 1 });


// ==========================================
// 4. BRAND
// ==========================================

const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    logo: String,
    description: String,
    website: String,
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


// ==========================================
// 5. PRODUCT
// ==========================================

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    sku: {
        type: String,
        unique: true,
        sparse: true
    },
    brandId: {
        type: Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    shortDescription: String,
    images: [{
        url: String,
        publicId: String,
        alt: String,
        isPrimary: {
            type: Boolean,
            default: false
        }
    }],
    tags: [String],
    specifications: [{
        key: String,
        value: String
    }],
    warranty: {
        duration: Number,
        unit: {
            type: String,
            enum: ["days", "months", "years"]
        },
        description: String
    },
    taxRate: {
        type: Number,
        default: 0,
        min: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    publishedAt: Date
}, { timestamps: true });

productSchema.index({ categoryId: 1, isActive: 1 });
productSchema.index({ brandId: 1, isActive: 1 });
productSchema.index({ name: "text", description: "text" });
productSchema.index({ isFeatured: 1, isActive: 1 });


// ==========================================
// 6. PRODUCT VARIANT
// ==========================================

const productVariantSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    attributes: [{
        name: String,
        value: String
    }],
    price: {
        type: Number,
        required: true,
        min: 0
    },
    compareAtPrice: {
        type: Number,
        min: 0
    },
    costPrice: {
        type: Number,
        min: 0,
        select: false
    },
    stock: {
        type: Number,
        default: 0,
        min: 0
    },
    reservedStock: {
        type: Number,
        default: 0,
        min: 0
    },
    lowStockThreshold: {
        type: Number,
        default: 5
    },
    weight: Number,
    dimensions: {
        length: Number,
        width: Number,
        height: Number,
        unit: {
            type: String,
            default: "cm"
        }
    },
    images: [String],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

productVariantSchema.index({ productId: 1, isActive: 1 });

productVariantSchema.virtual("availableStock").get(function () {
    return this.stock - this.reservedStock;
});


// ==========================================
// 7. INVENTORY LOG
// ==========================================

const inventoryLogSchema = new Schema({
    variantId: {
        type: Schema.Types.ObjectId,
        ref: "ProductVariant",
        required: true
    },
    changeType: {
        type: String,
        enum: [
            "purchase", "sale", "return",
            "adjustment", "reservation", "release"
        ],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    previousStock: {
        type: Number,
        required: true
    },
    newStock: {
        type: Number,
        required: true
    },
    referenceId: Schema.Types.ObjectId,
    note: String,
    performedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

inventoryLogSchema.index({ variantId: 1, createdAt: -1 });


// ==========================================
// 8. CART
// ==========================================

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        variantId: {
            type: Schema.Types.ObjectId,
            ref: "ProductVariant",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    }],
    couponId: {
        type: Schema.Types.ObjectId,
        ref: "Coupon",
        default: null
    }
}, { timestamps: true });


// ==========================================
// 9. WISHLIST
// ==========================================

const wishlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]
}, { timestamps: true });

wishlistSchema.index({ userId: 1 }, { unique: true });


// ==========================================
// 10. ORDER
// ==========================================

const orderSchema = new Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        variantId: {
            type: Schema.Types.ObjectId,
            ref: "ProductVariant"
        },
        productName: {
            type: String,
            required: true
        },
        sku: String,
        attributes: [{
            name: String,
            value: String
        }],
        image: String,
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        subtotal: {
            type: Number,
            required: true
        }
    }],
    shippingAddress: {
        fullName: String,
        phone: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
    },
    billingAddress: {
        fullName: String,
        phone: String,
        addressLine1: String,
        addressLine2: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
    },
    subtotal: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    shippingCharge: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true
    },
    couponId: {
        type: Schema.Types.ObjectId,
        ref: "Coupon"
    },
    orderStatus: {
        type: String,
        enum: [
            "pending", "confirmed", "processing",
            "shipped", "delivered", "cancelled", "returned"
        ],
        default: "pending"
    },
    paymentStatus: {
        type: String,
        enum: [
            "pending", "paid", "failed",
            "partially_refunded", "refunded"
        ],
        default: "pending"
    },
    paymentMethod: {
        type: String,
        enum: ["cod", "card", "upi", "netbanking", "wallet"]
    },
    notes: String,
    placedAt: Date,
    deliveredAt: Date,
    cancelledAt: Date
}, { timestamps: true });

orderSchema.index({ userId: 1, createdAt: -1 });
orderSchema.index({ orderStatus: 1, createdAt: -1 });


// ==========================================
// 11. PAYMENT
// ==========================================

const paymentSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    paymentGateway: {
        type: String,
        enum: ["razorpay", "stripe", "cashfree", "cod"],
        required: true
    },
    transactionId: {
        type: String,
        sparse: true,
        unique: true
    },
    gatewayOrderId: String,
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: "INR"
    },
    paymentMethod: String,
    status: {
        type: String,
        enum: [
            "created", "processing", "success",
            "failed", "refunded"
        ],
        default: "created"
    },
    failureReason: String,
    paidAt: Date,
    gatewayResponse: {
        type: Schema.Types.Mixed,
        select: false
    }
}, { timestamps: true });

paymentSchema.index({ orderId: 1, createdAt: -1 });


// ==========================================
// 12. SHIPMENT
// ==========================================

const shipmentSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    courierName: String,
    trackingNumber: String,
    trackingUrl: String,
    shippingStatus: {
        type: String,
        enum: [
            "not_shipped", "picked_up", "in_transit",
            "out_for_delivery", "delivered",
            "failed", "returned"
        ],
        default: "not_shipped"
    },
    estimatedDelivery: Date,
    shippedAt: Date,
    deliveredAt: Date,
    trackingHistory: [{
        status: String,
        location: String,
        description: String,
        timestamp: Date
    }]
}, { timestamps: true });

shipmentSchema.index({ trackingNumber: 1 }, { sparse: true });


// ==========================================
// 13. COUPON
// ==========================================

const couponSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    description: String,
    discountType: {
        type: String,
        enum: ["percentage", "fixed"],
        required: true
    },
    discountValue: {
        type: Number,
        required: true,
        min: 0
    },
    maxDiscount: Number,
    minimumOrderAmount: {
        type: Number,
        default: 0
    },
    usageLimit: Number,
    usedCount: {
        type: Number,
        default: 0
    },
    perUserLimit: {
        type: Number,
        default: 1
    },
    startDate: Date,
    expiryDate: Date,
    applicableCategories: [{
        type: Schema.Types.ObjectId,
        ref: "Category"
    }],
    applicableProducts: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


// ==========================================
// 14. REVIEW
// ==========================================

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    title: String,
    comment: {
        type: String,
        maxlength: 2000
    },
    images: [String],
    isVerifiedPurchase: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: true
    },
    helpfulCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

reviewSchema.index(
    { userId: 1, productId: 1 },
    { unique: true }
);

reviewSchema.index({ productId: 1, isApproved: 1 });


// ==========================================
// 15. RETURN
// ==========================================

const returnSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [{
        variantId: {
            type: Schema.Types.ObjectId,
            ref: "ProductVariant"
        },
        quantity: {
            type: Number,
            required: true
        },
        reason: String
    }],
    reason: {
        type: String,
        required: true
    },
    description: String,
    images: [String],
    status: {
        type: String,
        enum: [
            "requested", "approved", "rejected",
            "pickup_scheduled", "received",
            "refunded", "completed"
        ],
        default: "requested"
    },
    refundAmount: {
        type: Number,
        default: 0
    },
    adminNote: String,
    requestedAt: Date,
    processedAt: Date
}, { timestamps: true });


// ==========================================
// 16. NOTIFICATION
// ==========================================

const notificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: [
            "order", "payment", "shipping",
            "promotion", "account", "system"
        ],
        required: true
    },
    referenceId: Schema.Types.ObjectId,
    isRead: {
        type: Boolean,
        default: false
    },
    readAt: Date
}, { timestamps: true });

notificationSchema.index({
    userId: 1,
    isRead: 1,
    createdAt: -1
});


// ==========================================
// 17. COUPON USAGE
// ==========================================

const couponUsageSchema = new Schema({
    couponId: {
        type: Schema.Types.ObjectId,
        ref: "Coupon",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    discountAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

couponUsageSchema.index({ couponId: 1, userId: 1 });


// ==========================================
// 18. RECENTLY VIEWED
// ==========================================

const recentlyViewedSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    viewedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

recentlyViewedSchema.index({ userId: 1, viewedAt: -1 });


// ==========================================
// 19. PRODUCT QUESTION
// ==========================================

const questionSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: String,
    answeredBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    answeredAt: Date,
    isApproved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


// ==========================================
// 20. SUPPORT TICKET
// ==========================================

const supportTicketSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order"
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["open", "in_progress", "resolved", "closed"],
        default: "open"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high", "urgent"],
        default: "medium"
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });


// ==========================================
// 21. AUDIT LOG
// ==========================================

const auditLogSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    action: {
        type: String,
        required: true
    },
    entityType: {
        type: String,
        required: true
    },
    entityId: Schema.Types.ObjectId,
    details: Schema.Types.Mixed,
    ipAddress: String
}, { timestamps: true });

auditLogSchema.index({ adminId: 1, createdAt: -1 });


// ==========================================
// 22. EXPORT ALL MODELS
// ==========================================

module.exports = {
    User: model("User", userSchema),
    Address: model("Address", addressSchema),
    Category: model("Category", categorySchema),
    Brand: model("Brand", brandSchema),
    Product: model("Product", productSchema),
    ProductVariant: model("ProductVariant", productVariantSchema),
    InventoryLog: model("InventoryLog", inventoryLogSchema),
    Cart: model("Cart", cartSchema),
    Wishlist: model("Wishlist", wishlistSchema),
    Order: model("Order", orderSchema),
    Payment: model("Payment", paymentSchema),
    Shipment: model("Shipment", shipmentSchema),
    Coupon: model("Coupon", couponSchema),
    Review: model("Review", reviewSchema),
    Return: model("Return", returnSchema),
    Notification: model("Notification", notificationSchema),
    CouponUsage: model("CouponUsage", couponUsageSchema),
    RecentlyViewed: model("RecentlyViewed", recentlyViewedSchema),
    ProductQuestion: model("ProductQuestion", questionSchema),
    SupportTicket: model("SupportTicket", supportTicketSchema),
    AuditLog: model("AuditLog", auditLogSchema)
};
