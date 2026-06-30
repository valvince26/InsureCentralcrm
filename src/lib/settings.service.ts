import prisma from "@/lib/prisma";
import crypto from "crypto";

const ENCRYPTION_KEY = process.env.CRYPTO_SECRET || "default_secret_key_needs_32_bytes!"; // Must be 32 chars in prod
const IV_LENGTH = 16;

function encrypt(text: string) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY.slice(0, 32)), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text: string) {
  try {
    const textParts = text.split(":");
    const iv = Buffer.from(textParts.shift()!, "hex");
    const encryptedText = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY.slice(0, 32)), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (e) {
    return text; // Return raw if decryption fails (fallback for legacy non-encrypted)
  }
}

export class SettingsService {
  /**
   * Core Get method
   */
  static async getSetting<T>(organizationId: string, key: string, defaultValue: T): Promise<T> {
    const setting = await prisma.setting.findUnique({
      where: { organizationId_key: { organizationId, key } },
    });

    if (!setting) return defaultValue;

    try {
      return JSON.parse(setting.value) as T;
    } catch (e) {
      return setting.value as any as T;
    }
  }

  /**
   * Core Set method
   */
  static async setSetting<T>(organizationId: string, key: string, value: T): Promise<void> {
    const stringValue = typeof value === "string" ? value : JSON.stringify(value);
    
    await prisma.setting.upsert({
      where: { organizationId_key: { organizationId, key } },
      update: { value: stringValue },
      create: { organizationId, key, value: stringValue },
    });
  }

  // ----------------------------------------------------------------------
  // ORG GENERAL SETTINGS
  // ----------------------------------------------------------------------
  
  static async getGeneral(orgId: string) {
    return this.getSetting(orgId, "org_general", {
      companyName: "InsureFlow",
      companyLogo: "",
      website: "",
      supportEmail: "support@insureflow.com",
      supportPhone: "",
      businessAddress: "",
      timezone: "America/New_York",
      country: "US",
      language: "en-US",
      currency: "USD",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12h"
    });
  }

  static async setGeneral(orgId: string, data: any) {
    return this.setSetting(orgId, "org_general", data);
  }

  // ----------------------------------------------------------------------
  // ORG BRANDING
  // ----------------------------------------------------------------------
  
  static async getBranding(orgId: string) {
    return this.getSetting(orgId, "org_branding", {
      logo: "",
      favicon: "",
      loginBackground: "",
      primaryColor: "#00407e",
      secondaryColor: "#006a6a",
      sidebarColor: "#2f3133",
      buttonColor: "#00407e",
      accentColor: "#a8c8ff",
      typography: "Inter"
    });
  }

  static async setBranding(orgId: string, data: any) {
    return this.setSetting(orgId, "org_branding", data);
  }

  // ----------------------------------------------------------------------
  // BUSINESS HOURS
  // ----------------------------------------------------------------------
  
  static async getBusinessHours(orgId: string) {
    const defaultDay = { isOpen: true, open: "09:00", close: "17:00" };
    return this.getSetting(orgId, "org_business_hours", {
      timezone: "America/New_York",
      monday: { ...defaultDay },
      tuesday: { ...defaultDay },
      wednesday: { ...defaultDay },
      thursday: { ...defaultDay },
      friday: { ...defaultDay },
      saturday: { isOpen: false, open: "09:00", close: "17:00" },
      sunday: { isOpen: false, open: "09:00", close: "17:00" },
      holidayCalendar: []
    });
  }

  static async setBusinessHours(orgId: string, data: any) {
    return this.setSetting(orgId, "org_business_hours", data);
  }

  // ----------------------------------------------------------------------
  // EMAIL / SMTP (ENCRYPTED)
  // ----------------------------------------------------------------------
  
  static async getSmtpConfig(orgId: string) {
    const data = await this.getSetting(orgId, "comm_smtp", {
      companyEmail: "info@insurecentralhq.com",
      displayName: "Insure Central",
      replyTo: "info@insurecentralhq.com",
      host: "",
      port: "587",
      username: "",
      password: "",
      encryption: "tls",
      dailyLimit: 1000,
      bccAddress: "",
      maxAttachmentSize: 10
    });

    if (data.password) {
      data.password = decrypt(data.password);
    }
    return data;
  }

  static async setSmtpConfig(orgId: string, data: any) {
    if (data.password) {
      data.password = encrypt(data.password);
    }
    return this.setSetting(orgId, "comm_smtp", data);
  }
}
