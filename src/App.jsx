import React, { useState, useMemo } from "react";
import logo from "./assets/logo.png";

// Add your laptops here, one object per laptop, separated by commas.
// Copy the example below, edit the values, and keep going.
//
// useCase must be exactly one of: "student", "office", "gaming", "creative"
//
// { id: 1, name: "Acer Aspire 5", brand: "Acer", price: 42999, ram: 8, storage: 512, screen: 15.6, rating: 4.2, useCase: "student", battery: 9, weight: 1.7,
//   prices: { Amazon: 42999, Flipkart: 43499, Croma: 43999 } },
// { id: 1, name: "Acer Aspire 5", ..., image: "https://example.com/acer-aspire-5.jpg",
//   prices: { Amazon: 42999, Flipkart: 43499 } },

const LAPTOPS = [
  { id: 1, name: "MacBook Neo", brand: "Apple", price: 69900, ram: 8, storage: 256, screen: 13.0, rating: 4.8, useCase: "student", battery: 16, weight: 1.23,
    gpu: "Apple GPU (integrated)", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
    image:"https://www.apple.com/v/macbook-neo/b/images/overview/highlights/highlights_colors_endframe__c5rr2wp9mp0m_large_2x.jpg",prices: { "Apple Store": 69900, "iVenus": 66405 } },
  { id: 2, name: "MacBook Air 13\" M2", brand: "Apple", price: 87999, ram: 8, storage: 256, screen: 13.6, rating: 4.7, useCase: "student", battery: 18, weight: 1.24,
    gpu: "Apple M2 8-core GPU", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
   image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/f/j/g/-enriched-transparent-original-imahfthtkkzyazkf.png?q=90", prices: { "Apple Store": 87999, Amazon: 87999, Flipkart: 85990 } },
  { id: 3, name: "MacBook Air 15\" M2", brand: "Apple", price: 114900, ram: 8, storage: 256, screen: 15.3, rating: 4.8, useCase: "student", battery: 18, weight: 1.51,
    gpu: "Apple M2 10-core GPU", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/v/f/b/-original-imahggerxh8bhhu9.jpeg?q=90",prices: { "Apple Store": 114900 } },
  { id: 4, name: "MacBook Air 13\" M3", brand: "Apple", price: 99900, ram: 16, storage: 256, screen: 13.6, rating: 4.8, useCase: "student", battery: 18, weight: 1.24,
    gpu: "Apple M3 10-core GPU", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
   image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/8/c/u/-original-imagypv6yyg96khh.jpeg?q=90", prices: { "Apple Store": 99900, Amazon: 99900, Flipkart: 97990 } },
  { id: 5, name: "MacBook Air 15\" M3", brand: "Apple", price: 121399, ram: 16, storage: 256, screen: 15.3, rating: 4.8, useCase: "creative", battery: 18, weight: 1.51,
    gpu: "Apple M3 10-core GPU", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
   image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/a/q/h/-original-imagypv6prbgkfzg.jpeg?q=90", prices: { "Apple Store": 121399 } },
  { id: 6, name: "MacBook Air 13\" M4", brand: "Apple", price: 119900, ram: 16, storage: 256, screen: 13.6, rating: 4.9, useCase: "student", battery: 18, weight: 1.24,
    gpu: "Apple M4 10-core GPU", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/l/4/p/-original-imahayjpceghtzhy.jpeg?q=90",prices: { "Apple Store": 119900, Amazon: 119900, Flipkart: 117990 } },
  { id: 7, name: "MacBook Air 15\" M4", brand: "Apple", price: 139900, ram: 16, storage: 256, screen: 15.3, rating: 4.9, useCase: "creative", battery: 18, weight: 1.51,
    gpu: "Apple M4 10-core GPU", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/m/3/7/-original-imahayjpgztvrfyj.jpeg?q=90",prices: { "Apple Store": 139900 } },
  { id: 8, name: "MacBook Pro 14\" M4", brand: "Apple", price: 169900, ram: 16, storage: 512, screen: 14.2, rating: 4.8, useCase: "creative", battery: 24, weight: 1.55,
    gpu: "Apple M4 10-core GPU", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
   image:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-macbook-pro-size-unselect-202601-gallery-1?wid=5120&hei=3280&fmt=webp&qlt=90&.v=aXlkdGF0T0RUUVdDckNLaUc0OEE0d2huNHI2YVc1MjYxWkRLa3k4U1gzZnMyWXE0MHdoZXVFRHRoTGRqNEREOHJUNGJWZ1llU1plZmhBekVhZm5NQnNqbWRhTGpRM2xxVWJRWUhSaDlCQ3A3cWhkazVFSkNaSzNwMHhJRnYza1FlODBad1VqYUZ3RW54YkRKL2hzbXVR&traceId=1", prices: { "Apple Store": 169900, Amazon: 169900, Flipkart: 166990 } },
  { id: 9, name: "MacBook Pro 14\" M4 Pro", brand: "Apple", price: 199900, ram: 24, storage: 512, screen: 14.2, rating: 4.9, useCase: "creative", battery: 24, weight: 1.60,
    gpu: "Apple M4 Pro 16-core GPU", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
    image:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-macbook-pro-size-select-202601-14inch?wid=5120&hei=3280&fmt=webp&qlt=90&.v=aXlkdGF0T0RUUVdDckNLaUc0OEE0NGNlZWUwMTIzdTlRMENjTTRINjJoQzFraXhFSkFYNEExYXEyZ3YrQk5RbWZvSGF2dFhlaXl5ZzZDVTRMdEVvNll2UjRaSC9URTlmd0FSb1ZTWjRnb3U5QTF6QmtBWUlXQ1lEdjlqWkpBdFc&traceId=1",prices: { "Apple Store": 199900 } },
  { id: 10, name: "MacBook Pro 16\" M4 Pro", brand: "Apple", price: 249900, ram: 24, storage: 512, screen: 16.2, rating: 4.9, useCase: "creative", battery: 24, weight: 2.14,
    gpu: "Apple M4 Pro 20-core GPU", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
    image:"https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/mac-macbook-pro-finish-select-202601-16inch?wid=5120&hei=3280&fmt=webp&qlt=90&.v=aXlkdGF0T0RUUVdDckNLaUc0OEE0MEhGUTRkVVZndC9KWVVLOUdiOXdHbU9oQVd6ak9Ob0IrdjlmU1RKd0dmVEtZMGFKbG9yanhQdjZDS1dZUFFhRVE4bm1RcmlWRWp2eDN1WHNkSjNmUlplbUFLakxuY2U2Mk9HV3J6eUtTaWs&traceId=1",prices: { "Apple Store": 249900, Amazon: 249900, Flipkart: 244990 } },
  { id: 11, name: "MacBook Pro 16\" M4 Max", brand: "Apple", price: 349900, ram: 36, storage: 1024, screen: 16.2, rating: 4.9, useCase: "creative", battery: 24, weight: 2.15,
    gpu: "Apple M4 Max 40-core GPU", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/u/8/s/-original-imah697nhy4zeyyh.jpeg?q=90",prices: { "Apple Store": 349900 } },
  { id: 12, name: "ASUS Vivobook 15 (Core i5-12500H)", brand: "ASUS", price: 54990, ram: 16, storage: 512, screen: 15.6, rating: 4.5, useCase: "student", battery: 7, weight: 1.70,
    gpu: "Intel Iris Xe", buildQuality: "Standard", backlitKeyboard: false, fingerprintSensor: false, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/i/n/s/-original-imahg4v5zbx9zv29.jpeg?q=90",prices: { Amazon: 54990, Flipkart: 53990 } },
  { id: 13, name: "ASUS Vivobook S15 OLED (Core Ultra 7)", brand: "ASUS", price: 89990, ram: 16, storage: 1024, screen: 15.6, rating: 4.7, useCase: "creative", battery: 12, weight: 1.50,
    gpu: "Intel Arc Graphics", buildQuality: "Standard", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/v/o/r/-original-imahg5fxxfepnxsv.jpeg?q=90",prices: { Amazon: 89990, Flipkart: 88990 } },
  { id: 14, name: "Lenovo IdeaPad Slim 5 (Ryzen 7 7730U)", brand: "Lenovo", price: 63990, ram: 16, storage: 512, screen: 14.0, rating: 4.6, useCase: "student", battery: 10, weight: 1.46,
    gpu: "AMD Radeon Graphics", buildQuality: "Standard", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
   image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/k/d/o/-original-imahfkh3hurxyvtf.jpeg?q=90", prices: { Amazon: 63990, Flipkart: 62990 } },
  { id: 15, name: "Lenovo Yoga Slim 7i (Core Ultra 7)", brand: "Lenovo", price: 99990, ram: 16, storage: 1024, screen: 14.0, rating: 4.8, useCase: "creative", battery: 13, weight: 1.39,
    gpu: "Intel Arc Graphics", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/r/c/a/-enriched-transparent-original-imahg534shtdj5zf.png?q=90",prices: { Amazon: 99990, Flipkart: 97990 } },
  { id: 16, name: "HP Pavilion Plus 14 OLED", brand: "HP", price: 79990, ram: 16, storage: 512, screen: 14.0, rating: 4.6, useCase: "student", battery: 9, weight: 1.44,
    gpu: "Intel Iris Xe", buildQuality: "Standard", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
   image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/w/o/l/14-eh0021tu-thin-and-light-laptop-hp-original-imah3crtgh46zgnv.jpeg?q=90", prices: { Amazon: 79990, Flipkart: 78990 } },
  { id: 17, name: "HP Victus 15 (RTX 4050)", brand: "HP", price: 84990, ram: 16, storage: 512, screen: 15.6, rating: 4.5, useCase: "gaming", battery: 6, weight: 2.29,
    gpu: "NVIDIA RTX 4050", buildQuality: "Standard", backlitKeyboard: true, fingerprintSensor: false, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/o/5/n/-original-imahg5fxv5emu49y.jpeg?q=90",prices: { Amazon: 84990, Flipkart: 82990 } },
  { id: 18, name: "Dell Inspiron 15 3530", brand: "Dell", price: 59990, ram: 16, storage: 512, screen: 15.6, rating: 4.5, useCase: "office", battery: 8, weight: 1.65,
    gpu: "Intel UHD Graphics", buildQuality: "Standard", backlitKeyboard: false, fingerprintSensor: false, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/x/e/d/-original-imahg5fx6vyugqzh.jpeg?q=90",prices: { Amazon: 59990, Flipkart: 58490 } },
  { id: 19, name: "Dell XPS 13", brand: "Dell", price: 134990, ram: 16, storage: 512, screen: 13.4, rating: 4.8, useCase: "office", battery: 14, weight: 1.17,
    gpu: "Intel Iris Xe", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/jk01bww0/computer/x/5/z/dell-na-thin-and-light-laptop-original-imaf7fy9v5sbfsxp.jpeg?q=90",prices: { Amazon: 134990, Flipkart: 133990 } },
  { id: 20, name: "Acer Aspire Lite 15", brand: "Acer", price: 39990, ram: 16, storage: 512, screen: 15.6, rating: 4.4, useCase: "student", battery: 7, weight: 1.60,
    gpu: "Intel UHD Graphics", buildQuality: "Budget", backlitKeyboard: false, fingerprintSensor: false, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/r/l/n/-original-imahn6vwesuegyn8.jpeg?q=90",prices: { Amazon: 39990, Flipkart: 38990 } },
  { id: 21, name: "Acer Swift Go 14 OLED", brand: "Acer", price: 74990, ram: 16, storage: 512, screen: 14.0, rating: 4.7, useCase: "student", battery: 11, weight: 1.32,
    gpu: "Intel Iris Xe", buildQuality: "Standard", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/k/q/s/-enriched-transparent-original-imahg5fufcq8e6hs.png?q=90",prices: { Amazon: 74990, Flipkart: 73990 } },
  { id: 22, name: "MSI Thin 15 (RTX 4050)", brand: "MSI", price: 79990, ram: 16, storage: 512, screen: 15.6, rating: 4.4, useCase: "gaming", battery: 5, weight: 1.86,
    gpu: "NVIDIA RTX 4050", buildQuality: "Standard", backlitKeyboard: true, fingerprintSensor: false, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/a/m/q/-original-imahg4paevjahyvx.jpeg?q=90",prices: { Amazon: 79990, Flipkart: 78990 } },
  { id: 23, name: "MSI Prestige 13 AI Evo", brand: "MSI", price: 109990, ram: 16, storage: 1024, screen: 13.3, rating: 4.7, useCase: "office", battery: 15, weight: 0.99,
    gpu: "Intel integrated graphics", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/u/9/m/-original-imahg5fukttaujhn.jpeg?q=90",prices: { Amazon: 109990, Flipkart: 108990 } },
  { id: 24, name: "Samsung Galaxy Book5 Pro", brand: "Samsung", price: 119990, ram: 16, storage: 512, screen: 14.0, rating: 4.8, useCase: "office", battery: 18, weight: 1.23,
    gpu: "Intel Arc Graphics", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/k/h/x/-original-imahzc68vhkfdbgc.jpeg?q=90",prices: { Amazon: 119990, Flipkart: 118990 } },
  { id: 25, name: "Microsoft Surface Laptop 7", brand: "Microsoft", price: 129990, ram: 16, storage: 512, screen: 13.8, rating: 4.8, useCase: "office", battery: 20, weight: 1.34,
    gpu: "Qualcomm Adreno GPU", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: true, touchscreen: true,
   image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/7/m/m/-original-imahg5fx36a7hfuq.jpeg?q=90", prices: { Amazon: 129990, Flipkart: 128990 } },
  { id: 26, name: "Lenovo LOQ 15 (RTX 5050)", brand: "Lenovo", price: 94990, ram: 16, storage: 512, screen: 15.6, rating: 4.7, useCase: "gaming", battery: 5, weight: 2.38,
    gpu: "NVIDIA RTX 4060", buildQuality: "Standard", backlitKeyboard: true, fingerprintSensor: false, touchscreen: false,
   image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/q/q/k/-original-imahfdr2jny6ggky.jpeg?q=90", prices: { Amazon: 117990, Flipkart: 135690 } },
  { id: 27, name: "ASUS ROG Zephyrus G14", brand: "ASUS", price: 169990, ram: 16, storage: 1024, screen: 14.0, rating: 4.9, useCase: "gaming", battery: 10, weight: 1.50,
    gpu: "NVIDIA RTX 40-series (config dependent)", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: false, touchscreen: false,
   image:"https://rukminim2.flixcart.com/image/1536/1536/ku4ezrk0/computer/6/p/p/na-thin-and-light-laptop-asus-original-imag7bhgbhprepfu.jpeg?q=90", prices: { Amazon: 169990, Flipkart: 168990 } },
  { id: 28, name: "ASUS Vivobook Go 15 OLED (Ryzen 5 7520U)", brand: "ASUS", price: 46990, ram: 16, storage: 512, screen: 15.6, rating: 4.5, useCase: "student", battery: 8, weight: 1.63,
    gpu: "AMD Radeon Graphics", buildQuality: "Budget", backlitKeyboard: false, fingerprintSensor: false, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/y/z/d/-enriched-transparent-original-imahg5fue8qmg6wk.png?q=90",prices: { Amazon: 46990, Flipkart: 45990 } },
  { id: 29, name: "Lenovo V15 G4 (Ryzen 5 7530U)", brand: "Lenovo", price: 48990, ram: 16, storage: 512, screen: 15.6, rating: 4.4, useCase: "office", battery: 8, weight: 1.65,
    gpu: "AMD Radeon Graphics", buildQuality: "Budget", backlitKeyboard: false, fingerprintSensor: false, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/a/x/f/-original-imahg4utpfgztv6e.jpeg?q=90",prices: { Amazon: 48990, Flipkart: 47990 } },
  { id: 30, name: "Lenovo IdeaPad Flex 5 (Ryzen 5 7530U)", brand: "Lenovo", price: 69990, ram: 16, storage: 512, screen: 14.0, rating: 4.6, useCase: "student", battery: 10, weight: 1.55,
    gpu: "AMD Radeon Graphics", buildQuality: "Standard", backlitKeyboard: false, fingerprintSensor: false, touchscreen: true,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/w/5/2/-original-imahex3uruhyugxr.jpeg?q=90",prices: { Amazon: 69990, Flipkart: 68990 } },
  { id: 31, name: "HP 15s (Ryzen 5 7530U)", brand: "HP", price: 52990, ram: 16, storage: 512, screen: 15.6, rating: 4.5, useCase: "student", battery: 8, weight: 1.69,
    gpu: "AMD Radeon Graphics", buildQuality: "Budget", backlitKeyboard: false, fingerprintSensor: false, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/kqttg280/computer/a/p/c/na-thin-and-light-laptop-hp-original-imag4r6xquheeasd.jpeg?q=90",prices: { Amazon: 52990, Flipkart: 51990 } },
  { id: 32, name: "HP 14 (Core i5-1335U)", brand: "HP", price: 59990, ram: 16, storage: 512, screen: 14.0, rating: 4.5, useCase: "student", battery: 9, weight: 1.41,
    gpu: "Intel Iris Xe", buildQuality: "Standard", backlitKeyboard: false, fingerprintSensor: false, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/z/i/b/-original-imahzu4rwxnezv9x.jpeg?q=90",prices: { Amazon: 59990, Flipkart: 58990 } },
  { id: 33, name: "Dell Vostro 3530 (Core i5-1334U)", brand: "Dell", price: 62990, ram: 16, storage: 512, screen: 15.6, rating: 4.5, useCase: "office", battery: 8, weight: 1.66,
    gpu: "Intel UHD Graphics", buildQuality: "Standard", backlitKeyboard: false, fingerprintSensor: true, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/s/p/q/-original-imah8psh7nh6udzj.jpeg?q=90",prices: { Amazon: 62990, Flipkart: 61990 } },
  { id: 34, name: "Acer Aspire 5 (Core i5-13420H)", brand: "Acer", price: 58990, ram: 16, storage: 512, screen: 15.6, rating: 4.5, useCase: "student", battery: 7, weight: 1.78,
    gpu: "Intel UHD Graphics", buildQuality: "Standard", backlitKeyboard: false, fingerprintSensor: false, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/a/q/l/-original-imahg5fxjt6y3ufu.jpeg?q=90",prices: { Amazon: 58990, Flipkart: 57990 } },
  { id: 35, name: "Acer TravelMate P2 (Core i5-1335U)", brand: "Acer", price: 64990, ram: 16, storage: 512, screen: 14.0, rating: 4.5, useCase: "office", battery: 10, weight: 1.60,
    gpu: "Intel Iris Xe", buildQuality: "Standard", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/keaaavk0/computer/a/v/t/acer-travelmate-p214-52-thin-and-light-laptop-original-imafuzrkmcspngnr.jpeg?q=90",prices: { Amazon: 64990, Flipkart: 63990 } },
  { id: 36, name: "MSI Modern 14 (Core i5-1335U)", brand: "MSI", price: 55990, ram: 16, storage: 512, screen: 14.0, rating: 4.4, useCase: "student", battery: 8, weight: 1.40,
    gpu: "Intel Iris Xe", buildQuality: "Standard", backlitKeyboard: false, fingerprintSensor: true, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/klzhq4w0/computer/s/k/x/na-thin-and-light-laptop-msi-original-imagyzpcazfbmhjp.jpeg?q=90",prices: { Amazon: 55990, Flipkart: 54990 } },
  { id: 37, name: "MSI Modern 15 (Ryzen 7 7730U)", brand: "MSI", price: 63990, ram: 16, storage: 512, screen: 15.6, rating: 4.5, useCase: "office", battery: 9, weight: 1.70,
    gpu: "AMD Radeon Graphics", buildQuality: "Standard", backlitKeyboard: false, fingerprintSensor: true, touchscreen: false,
    image:"https://storage-asset.msi.com/global/picture/product/product_16195780387bae8218947d16ec2e4e40e636be8e1e.webp",prices: { Amazon: 63990, Flipkart: 62990 } },
  { id: 38, name: "Samsung Galaxy Book4 (Core i5-1335U)", brand: "Samsung", price: 67990, ram: 16, storage: 512, screen: 15.6, rating: 4.7, useCase: "office", battery: 14, weight: 1.57,
    gpu: "Intel UHD Graphics", buildQuality: "Standard", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/k/t/y/-enriched-transparent-original-imahg53xspmfrsdd.png?q=90",prices: { Amazon: 67990, Flipkart: 66990 } },
  { id: 39, name: "Samsung Galaxy Book4 360", brand: "Samsung", price: 69990, ram: 16, storage: 512, screen: 15.6, rating: 4.7, useCase: "creative", battery: 15, weight: 1.46,
    gpu: "Intel Iris Xe", buildQuality: "Standard", backlitKeyboard: true, fingerprintSensor: true, touchscreen: true,
    image:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSbQWgS9_mF1j3w0RawbQxsnICDT6cKJqM2aNaBys2kPhtgrSDjQ4XJsgurhehZ0hPlOfsG_SSTURey0q0wI8w6SzhmNLBpO-WaqyyeSdxHF-7w0QLBVVpqhw",prices: { Amazon: 69990, Flipkart: 68990 } },
  { id: 40, name: "LG Gram 14 (13th Gen i5)", brand: "LG", price: 69990, ram: 16, storage: 512, screen: 14.0, rating: 4.8, useCase: "office", battery: 18, weight: 0.99,
    gpu: "Intel Iris Xe", buildQuality: "Premium", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
    image:"https://www.lg.com/content/dam/channel/wcms/in/images/computers/14z90r-g_cp75a2_eail_in_c/gallery/14Z90R-G.CP75A2-DZ-01.jpg?w=800",prices: { Amazon: 69990, Flipkart: 69490 } },
  { id: 41, name: "Infinix ZERO BOOK 13 (Core i5-12500H)", brand: "Infinix", price: 49990, ram: 16, storage: 512, screen: 15.6, rating: 4.4, useCase: "student", battery: 8, weight: 1.80,
    gpu: "Intel Iris Xe", buildQuality: "Standard", backlitKeyboard: false, fingerprintSensor: false, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/s/h/g/-original-imahg4pamzhfnubs.jpeg?q=90",prices: { Amazon: 49990, Flipkart: 48990 } },
  { id: 42, name: "Infinix ZERO BOOK Ultra (Core i7-12700H)", brand: "Infinix", price: 69990, ram: 16, storage: 512, screen: 15.6, rating: 4.5, useCase: "office", battery: 8, weight: 1.80,
    gpu: "Intel Iris Xe", buildQuality: "Standard", backlitKeyboard: true, fingerprintSensor: false, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/v/f/1/-original-imahg5ftmfsdpqjt.jpeg?q=90",prices: { Amazon: 69990, Flipkart: 68990 } },
  { id: 43, name: "HONOR MagicBook X16 (Core i5-12450H)", brand: "HONOR", price: 49990, ram: 16, storage: 512, screen: 16.0, rating: 4.5, useCase: "student", battery: 9, weight: 1.75,
    gpu: "Intel UHD Graphics", buildQuality: "Budget", backlitKeyboard: false, fingerprintSensor: false, touchscreen: false,
    image:"https://www-file.honor.com/content/dam/honor/global/products/laptop/honor-magicbook-x16-2024/img/section-2/s1-img-pc-1.png",prices: { Amazon: 49990, Flipkart: 48990 } },
  { id: 44, name: "HONOR MagicBook X14 (Core i5-13420H)", brand: "HONOR", price: 56990, ram: 16, storage: 512, screen: 14.0, rating: 4.5, useCase: "office", battery: 10, weight: 1.40,
    gpu: "Intel UHD Graphics", buildQuality: "Budget", backlitKeyboard: false, fingerprintSensor: false, touchscreen: false,
    image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/v/q/c/magicbook-14-notebook-honor-original-imagq3czzgxycff3.jpeg?q=90",prices: { Amazon: 56990, Flipkart: 55990 } },
  { id: 45, name: "Chuwi CoreBook X Pro", brand: "Chuwi", price: 42990, ram: 16, storage: 512, screen: 15.6, rating: 4.3, useCase: "student", battery: 8, weight: 1.70,
    gpu: "Intel UHD Graphics", buildQuality: "Budget", backlitKeyboard: false, fingerprintSensor: false, touchscreen: false,
   image:"https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/m/f/e/corebook-x-pro-laptop-chuwi-original-imah4gr9vag3hpsy.jpeg?q=90", prices: { Amazon: 42990 } },
{ id: 46, name: "Moto Book 60 Pro (Core Ultra 5)", brand: "Motorola", price: 71990, ram: 16, storage: 1024, screen: 14.0, rating: 4.6, useCase: "creative", battery: 12, weight: 1.39,
  gpu: "Intel Arc Graphics", buildQuality: "Standard", backlitKeyboard: true, fingerprintSensor: true, touchscreen: false,
  image: "https://rukminim2.flixcart.com/image/1536/1536/xif0q/computer/y/b/d/-original-imahhbyxrzwemer3.jpeg?q=90",
  prices: { Flipkart: 71990 } },
  ];

const USE_CASES = [
  { value: "all", label: "Any use" },
  { value: "student", label: "Student / everyday" },
  { value: "office", label: "Office / work" },
  { value: "gaming", label: "Gaming" },
  { value: "creative", label: "Creative / design" },
];

const SORTS = [
  { value: "recommended", label: "Recommended" },
  { value: "price_low", label: "Price: low to high" },
  { value: "price_high", label: "Price: high to low" },
  { value: "rating", label: "Rating: highest" },
  { value: "ram", label: "RAM: highest" },
];

function formatINR(n) {
  return "\u20b9" + n.toLocaleString("en-IN");
}

function LaptopCard({ laptop }) {
  const [expanded, setExpanded] = useState(false);
  const bestStore = Object.entries(laptop.prices).sort((a, b) => a[1] - b[1])[0];

  return (
    
    <div className="laptop-card" style={{
      background: "var(--surface-2)",
      border: "0.5px solid var(--border)",
      borderRadius: "12px",
      padding: "1.25rem",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}>
      <img
        src={laptop.image || "https://via.placeholder.com/300x200?text=No+Image"}
        alt={laptop.name}
         loading="lazy"
        style={{ width: "100%", height: "160px", objectFit: "contain", background: "#c4b08a", borderRadius: "8px" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0, letterSpacing: "0.02em", textTransform: "uppercase" }}>{laptop.brand}</p>
          <p style={{ fontWeight: 500, fontSize: "17px", margin: "2px 0 0" }}>{laptop.name}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "var(--bg-success)", color: "var(--text-success)", fontSize: "13px", fontWeight: 500, padding: "3px 8px", borderRadius: "999px" }}>
          <i className="ti ti-star" style={{ fontSize: "13px" }} aria-hidden="true"></i>
          {laptop.rating}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", fontSize: "12.5px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", borderTop: "0.5px solid var(--border)", borderBottom: "0.5px solid var(--border)", padding: "10px 0" }}>
        <div><i className="ti ti-cpu" aria-hidden="true"></i> {laptop.ram}GB RAM</div>
        <div><i className="ti ti-device-sd-card" aria-hidden="true"></i> {laptop.storage}GB</div>
        <div><i className="ti ti-device-desktop" aria-hidden="true"></i> {laptop.screen}"</div>
        <div><i className="ti ti-battery" aria-hidden="true"></i> {laptop.battery}h</div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: "22px", fontWeight: 500 }}>{formatINR(laptop.price)}</span>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>best: {bestStore[0]}</span>
      </div>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {laptop.gpu && <span style={{ fontSize: "11.5px", background: "var(--surface-1)", padding: "2px 8px", borderRadius: "999px", color: "var(--text-secondary)" }}>{laptop.gpu}</span>}
        {laptop.buildQuality && <span style={{ fontSize: "11.5px", background: "var(--surface-1)", padding: "2px 8px", borderRadius: "999px", color: "var(--text-secondary)" }}>{laptop.buildQuality} build</span>}
        {laptop.backlitKeyboard && <span style={{ fontSize: "11.5px", background: "var(--surface-1)", padding: "2px 8px", borderRadius: "999px", color: "var(--text-secondary)" }}>Backlit keyboard</span>}
        {laptop.fingerprintSensor && <span style={{ fontSize: "11.5px", background: "var(--surface-1)", padding: "2px 8px", borderRadius: "999px", color: "var(--text-secondary)" }}>Fingerprint sensor</span>}
        {laptop.touchscreen && <span style={{ fontSize: "11.5px", background: "var(--surface-1)", padding: "2px 8px", borderRadius: "999px", color: "var(--text-secondary)" }}>Touchscreen</span>}
      </div>

      <button onClick={() => setExpanded(!expanded)} style={{ fontSize: "13px" }}>
        {expanded ? "Hide price comparison" : "Compare prices"}
        <i className={`ti ti-chevron-${expanded ? "up" : "down"}`} style={{ marginLeft: "6px", fontSize: "13px" }} aria-hidden="true"></i>
      </button>

      {expanded && (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "2px" }}>
          {Object.entries(laptop.prices).map(([store, price]) => (
            <div key={store} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13.5px", padding: "6px 10px", background: price === bestStore[1] ? "var(--bg-success)" : "var(--surface-1)", borderRadius: "6px" }}>
              <span style={{ color: price === bestStore[1] ? "var(--text-success)" : "var(--text-secondary)" }}>{store}</span>
              <span style={{ fontWeight: 500 }}>{formatINR(price)}</span>
            </div>
          ))}
          <p style={{ fontSize: "11.5px", color: "var(--text-muted)", margin: "4px 0 0" }}>Sample prices for demo. Wire these to real affiliate links or a price API later.</p>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [useCase, setUseCase] = useState("all");
  const [maxPrice, setMaxPrice] = useState(400000);
  const [minRam, setMinRam] = useState(0);
  const [sortBy, setSortBy] = useState("recommended");

  const filtered = useMemo(() => {
    let list = LAPTOPS.filter(l =>
      (useCase === "all" || l.useCase === useCase) &&
      l.price <= maxPrice &&
      l.ram >= minRam
    );
    if (sortBy === "price_low") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price_high") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "ram") list = [...list].sort((a, b) => b.ram - a.ram);
    return list;
  }, [useCase, maxPrice, minRam, sortBy]);

  return (
    <div style={{ maxWidth: "980px", margin: "0 auto", padding: "1.5rem", fontFamily: "var(--font-sans)" }}>
  <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0px" }}>
        <img src={logo} alt="What2Buy!" style={{ height: "150px" }} />
       
         <p style={{ color: "var(--text-primary)", fontWeight: 600, margin: 0 }}>Filter by what matters, compare prices, buy where it's cheapest.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "1.5rem", background: "var(--surface-1)", padding: "1rem", borderRadius: "12px" }}>
        <div>
          <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Use case</label>
          <select value={useCase} onChange={e => setUseCase(e.target.value)} style={{ width: "100%" }}>
            {USE_CASES.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Max price: {formatINR(maxPrice)}</label>
          <input type="range" min="30000" max="400000" step="5000" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} style={{ width: "100%" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Min RAM: {minRam}GB</label>
          <input type="range" min="0" max="16" step="8" value={minRam} onChange={e => setMinRam(Number(e.target.value))} style={{ width: "100%" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Sort by</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: "100%" }}>
            {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
      </div>

      <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "1rem" }}>{filtered.length} laptops match</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px" }}>
        {filtered.map(l => <LaptopCard key={l.id} laptop={l} />)}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "2rem 0" }}>No laptops match these filters. Try widening your range.</p>
      )}

      <div style={{ marginTop: "2rem", border: "1px dashed var(--border-strong)", borderRadius: "12px", padding: "1.5rem", textAlign: "center", color: "var(--text-muted)", fontSize: "13px" }}>
        Ad space (300x250) — reserved for AdSense or affiliate banners once the site has traffic
      </div>
    </div>
  );
}