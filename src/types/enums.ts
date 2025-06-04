// src/types/enums.ts

// User Roles
export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  CASHIER = 'CASHIER',
  WAITER = 'WAITER',
  KITCHEN = 'KITCHEN'
}

export const ROLES = Object.values(Role)

// Item Types
export enum ItemType {
  VEG = 'VEG',
  NON_VEG = 'NON_VEG',
  BEVERAGE = 'BEVERAGE',
  DESSERT = 'DESSERT'
}

export const ITEM_TYPES = Object.values(ItemType)

// Table Status
export enum TableStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED',
  MAINTENANCE = 'MAINTENANCE'
}

export const TABLE_STATUSES = Object.values(TableStatus)

// Order Types
export enum OrderType {
  DINE_IN = 'DINE_IN',
  TAKEAWAY = 'TAKEAWAY',
  DELIVERY = 'DELIVERY'
}

export const ORDER_TYPES = Object.values(OrderType)

// Order Status
export enum OrderStatus {
  NEW = 'NEW',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  SERVED = 'SERVED',
  CANCELLED = 'CANCELLED'
}

export const ORDER_STATUSES = Object.values(OrderStatus)

// Item Status
export enum ItemStatus {
  ORDERED = 'ORDERED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  SERVED = 'SERVED'
}

export const ITEM_STATUSES = Object.values(ItemStatus)

// Invoice Status
export enum InvoiceStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  PARTIAL = 'PARTIAL',
  CANCELLED = 'CANCELLED'
}

export const INVOICE_STATUSES = Object.values(InvoiceStatus)

// Payment Modes
export enum PaymentMode {
  CASH = 'CASH',
  CARD = 'CARD',
  UPI = 'UPI',
  WALLET = 'WALLET',
  CREDIT = 'CREDIT'
}

export const PAYMENT_MODES = Object.values(PaymentMode)

// Validation functions
export const isValidRole = (role: string): role is Role => {
  return ROLES.includes(role as Role)
}

export const isValidItemType = (type: string): type is ItemType => {
  return ITEM_TYPES.includes(type as ItemType)
}

export const isValidTableStatus = (status: string): status is TableStatus => {
  return TABLE_STATUSES.includes(status as TableStatus)
}

export const isValidOrderType = (type: string): type is OrderType => {
  return ORDER_TYPES.includes(type as OrderType)
}

export const isValidOrderStatus = (status: string): status is OrderStatus => {
  return ORDER_STATUSES.includes(status as OrderStatus)
}

export const isValidItemStatus = (status: string): status is ItemStatus => {
  return ITEM_STATUSES.includes(status as ItemStatus)
}

export const isValidInvoiceStatus = (status: string): status is InvoiceStatus => {
  return INVOICE_STATUSES.includes(status as InvoiceStatus)
}

export const isValidPaymentMode = (mode: string): mode is PaymentMode => {
  return PAYMENT_MODES.includes(mode as PaymentMode)
}

// Display labels for UI
export const ROLE_LABELS = {
  [Role.ADMIN]: 'Administrator',
  [Role.MANAGER]: 'Manager',
  [Role.CASHIER]: 'Cashier',
  [Role.WAITER]: 'Waiter',
  [Role.KITCHEN]: 'Kitchen Staff'
}

export const ITEM_TYPE_LABELS = {
  [ItemType.VEG]: 'Vegetarian',
  [ItemType.NON_VEG]: 'Non-Vegetarian',
  [ItemType.BEVERAGE]: 'Beverage',
  [ItemType.DESSERT]: 'Dessert'
}

export const TABLE_STATUS_LABELS = {
  [TableStatus.AVAILABLE]: 'Available',
  [TableStatus.OCCUPIED]: 'Occupied',
  [TableStatus.RESERVED]: 'Reserved',
  [TableStatus.MAINTENANCE]: 'Under Maintenance'
}

export const ORDER_TYPE_LABELS = {
  [OrderType.DINE_IN]: 'Dine In',
  [OrderType.TAKEAWAY]: 'Takeaway',
  [OrderType.DELIVERY]: 'Delivery'
}

export const ORDER_STATUS_LABELS = {
  [OrderStatus.NEW]: 'New Order',
  [OrderStatus.CONFIRMED]: 'Confirmed',
  [OrderStatus.PREPARING]: 'Preparing',
  [OrderStatus.READY]: 'Ready',
  [OrderStatus.SERVED]: 'Served',
  [OrderStatus.CANCELLED]: 'Cancelled'
}

export const PAYMENT_MODE_LABELS = {
  [PaymentMode.CASH]: 'Cash',
  [PaymentMode.CARD]: 'Card',
  [PaymentMode.UPI]: 'UPI',
  [PaymentMode.WALLET]: 'Digital Wallet',
  [PaymentMode.CREDIT]: 'Credit'
}