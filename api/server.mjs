var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'enum ApprovalStatus {\n  PENDING\n  APPROVED\n  REJECTED\n}\n\nenum BookingStatus {\n  PENDING\n  CONFIRMED\n  COMPLETED\n  CANCELLED\n}\n\nenum PaymentStatus {\n  UNPAID\n  PAID\n  REFUNDED\n}\n\nmodel Booking {\n  id             String        @id @default(uuid())\n  userId         String\n  tutorProfileId String\n  categoryId     String?\n  tutorSlotsId   String\n  bookingStatus  BookingStatus @default(COMPLETED)\n  totalPrice     Int\n  paymentStatus  PaymentStatus @default(PAID)\n  createdAt      DateTime      @default(now())\n  updatedAt      DateTime      @updatedAt\n\n  // Relations\n  user         User         @relation(fields: [userId], references: [id], onDelete: Cascade)\n  tutorProfile TutorProfile @relation(fields: [tutorProfileId], references: [id], onDelete: Cascade)\n  category     Category?    @relation(fields: [categoryId], references: [id], onDelete: Cascade)\n  tutorSlot    TutorSlot    @relation(fields: [tutorSlotsId], references: [id], onDelete: Cascade)\n  review       Review?\n\n  @@map("booking")\n}\n\nmodel Category {\n  id          String   @id @default(uuid())\n  name        String\n  icon        String?\n  description String?\n  isActive    Boolean  @default(true)\n  sortOrder   Int?\n  createdAt   DateTime @default(now())\n  updatedAt   DateTime @updatedAt\n\n  // Relations\n  bookings Booking[]\n\n  @@map("categories")\n}\n\nmodel Review {\n  id             String   @id @default(uuid())\n  userId         String\n  tutorProfileId String\n  bookingId      String?  @unique\n  comment        String\n  rating         Int\n  createdAt      DateTime @default(now())\n\n  // Relations\n  tutorProfile TutorProfile @relation(fields: [tutorProfileId], references: [id], onDelete: Cascade)\n  booking      Booking?     @relation(fields: [bookingId], references: [id], onDelete: Cascade)\n\n  @@map("review")\n}\n\nmodel TutorProfile {\n  id              String         @id @default(uuid())\n  userId          String         @unique\n  name            String\n  bio             String\n  education       String\n  experienceYears String\n  teachingMode    String\n  isAvailable     Boolean        @default(true)\n  approvalStatus  ApprovalStatus @default(PENDING)\n  averageRating   Float?         @default(0.0)\n  profileImage    String?\n  languages       String[] // Postgres array\n  createdAt       DateTime       @default(now())\n  updatedAt       DateTime       @updatedAt\n\n  // Relations\n  user       User        @relation(fields: [userId], references: [id], onDelete: Cascade)\n  tutorSlots TutorSlot[]\n  bookings   Booking[]\n  reviews    Review[]\n\n  @@map("tutorProfile")\n}\n\nmodel TutorSlot {\n  id           String   @id @default(uuid())\n  tutorId      String\n  startTime    String\n  endTime      String\n  duration     String\n  teachingMode String\n  maxStudent   Int\n  hourlyRate   Int\n  category     String\n  isActive     Boolean  @default(true)\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n\n  // Relations\n  tutorProfile TutorProfile @relation(fields: [tutorId], references: [id], onDelete: Cascade)\n  bookings     Booking[]\n\n  @@map("tutorSlots")\n}\n\nmodel User {\n  id            String         @id\n  name          String\n  email         String\n  emailVerified Boolean        @default(false)\n  image         String?\n  createdAt     DateTime       @default(now())\n  updatedAt     DateTime       @updatedAt\n  role          String?        @default("TUTOR")\n  phone         String?\n  status        String?        @default("ACTIVE")\n  sessions      Session[]\n  accounts      Account[]\n  bookings      Booking[]\n  tutorProfiles TutorProfile[]\n\n  @@unique([email])\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@unique([token])\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma/"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Booking":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"tutorProfileId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"tutorSlotsId","kind":"scalar","type":"String"},{"name":"bookingStatus","kind":"enum","type":"BookingStatus"},{"name":"totalPrice","kind":"scalar","type":"Int"},{"name":"paymentStatus","kind":"enum","type":"PaymentStatus"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"BookingToUser"},{"name":"tutorProfile","kind":"object","type":"TutorProfile","relationName":"BookingToTutorProfile"},{"name":"category","kind":"object","type":"Category","relationName":"BookingToCategory"},{"name":"tutorSlot","kind":"object","type":"TutorSlot","relationName":"BookingToTutorSlot"},{"name":"review","kind":"object","type":"Review","relationName":"BookingToReview"}],"dbName":"booking"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"icon","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"sortOrder","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToCategory"}],"dbName":"categories"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"tutorProfileId","kind":"scalar","type":"String"},{"name":"bookingId","kind":"scalar","type":"String"},{"name":"comment","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"tutorProfile","kind":"object","type":"TutorProfile","relationName":"ReviewToTutorProfile"},{"name":"booking","kind":"object","type":"Booking","relationName":"BookingToReview"}],"dbName":"review"},"TutorProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"education","kind":"scalar","type":"String"},{"name":"experienceYears","kind":"scalar","type":"String"},{"name":"teachingMode","kind":"scalar","type":"String"},{"name":"isAvailable","kind":"scalar","type":"Boolean"},{"name":"approvalStatus","kind":"enum","type":"ApprovalStatus"},{"name":"averageRating","kind":"scalar","type":"Float"},{"name":"profileImage","kind":"scalar","type":"String"},{"name":"languages","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"TutorProfileToUser"},{"name":"tutorSlots","kind":"object","type":"TutorSlot","relationName":"TutorProfileToTutorSlot"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToTutorProfile"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToTutorProfile"}],"dbName":"tutorProfile"},"TutorSlot":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"tutorId","kind":"scalar","type":"String"},{"name":"startTime","kind":"scalar","type":"String"},{"name":"endTime","kind":"scalar","type":"String"},{"name":"duration","kind":"scalar","type":"String"},{"name":"teachingMode","kind":"scalar","type":"String"},{"name":"maxStudent","kind":"scalar","type":"Int"},{"name":"hourlyRate","kind":"scalar","type":"Int"},{"name":"category","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"tutorProfile","kind":"object","type":"TutorProfile","relationName":"TutorProfileToTutorSlot"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToTutorSlot"}],"dbName":"tutorSlots"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"role","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"bookings","kind":"object","type":"Booking","relationName":"BookingToUser"},{"name":"tutorProfiles","kind":"object","type":"TutorProfile","relationName":"TutorProfileToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AccountScalarFieldEnum: () => AccountScalarFieldEnum,
  AnyNull: () => AnyNull2,
  BookingScalarFieldEnum: () => BookingScalarFieldEnum,
  CategoryScalarFieldEnum: () => CategoryScalarFieldEnum,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  ReviewScalarFieldEnum: () => ReviewScalarFieldEnum,
  SessionScalarFieldEnum: () => SessionScalarFieldEnum,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  TutorProfileScalarFieldEnum: () => TutorProfileScalarFieldEnum,
  TutorSlotScalarFieldEnum: () => TutorSlotScalarFieldEnum,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  VerificationScalarFieldEnum: () => VerificationScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.3.0",
  engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  Booking: "Booking",
  Category: "Category",
  Review: "Review",
  TutorProfile: "TutorProfile",
  TutorSlot: "TutorSlot",
  User: "User",
  Session: "Session",
  Account: "Account",
  Verification: "Verification"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var BookingScalarFieldEnum = {
  id: "id",
  userId: "userId",
  tutorProfileId: "tutorProfileId",
  categoryId: "categoryId",
  tutorSlotsId: "tutorSlotsId",
  bookingStatus: "bookingStatus",
  totalPrice: "totalPrice",
  paymentStatus: "paymentStatus",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var CategoryScalarFieldEnum = {
  id: "id",
  name: "name",
  icon: "icon",
  description: "description",
  isActive: "isActive",
  sortOrder: "sortOrder",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var ReviewScalarFieldEnum = {
  id: "id",
  userId: "userId",
  tutorProfileId: "tutorProfileId",
  bookingId: "bookingId",
  comment: "comment",
  rating: "rating",
  createdAt: "createdAt"
};
var TutorProfileScalarFieldEnum = {
  id: "id",
  userId: "userId",
  name: "name",
  bio: "bio",
  education: "education",
  experienceYears: "experienceYears",
  teachingMode: "teachingMode",
  isAvailable: "isAvailable",
  approvalStatus: "approvalStatus",
  averageRating: "averageRating",
  profileImage: "profileImage",
  languages: "languages",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var TutorSlotScalarFieldEnum = {
  id: "id",
  tutorId: "tutorId",
  startTime: "startTime",
  endTime: "endTime",
  duration: "duration",
  teachingMode: "teachingMode",
  maxStudent: "maxStudent",
  hourlyRate: "hourlyRate",
  category: "category",
  isActive: "isActive",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  emailVerified: "emailVerified",
  image: "image",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  role: "role",
  phone: "phone",
  status: "status"
};
var SessionScalarFieldEnum = {
  id: "id",
  expiresAt: "expiresAt",
  token: "token",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  ipAddress: "ipAddress",
  userAgent: "userAgent",
  userId: "userId"
};
var AccountScalarFieldEnum = {
  id: "id",
  accountId: "accountId",
  providerId: "providerId",
  userId: "userId",
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  idToken: "idToken",
  accessTokenExpiresAt: "accessTokenExpiresAt",
  refreshTokenExpiresAt: "refreshTokenExpiresAt",
  scope: "scope",
  password: "password",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var VerificationScalarFieldEnum = {
  id: "id",
  identifier: "identifier",
  value: "value",
  expiresAt: "expiresAt",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/app.ts
import express5 from "express";
import dotenv2 from "dotenv";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";

// lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

// src/config/config.ts
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
var config2 = {
  databaseUrl: process.env.DATABASE_URL || "",
  appPort: process.env.PORT || 5e3,
  betterAuthSecret: process.env.BETTER_AUTH_SECRET,
  betterAuthUrl: process.env.BETTER_AUTH_URL || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  appEmail: process.env.APP_EMAIL || "",
  appUser: process.env.APP_USER || "",
  appUrl: process.env.APP_URL || "",
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development"
};

// lib/auth.ts
import { nextCookies } from "better-auth/next-js";
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  baseURL: config2.betterAuthUrl,
  basePath: "/api/auth",
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: true,
    trustedOrigins: true,
    crossSubDomainCookies: {
      enabled: true
    },
    cookies: {
      session_token: {
        attributes: {
          secure: true,
          httpOnly: true,
          sameSite: "None",
          path: "/"
        }
      }
    },
    disableCSRFCheck: true
  },
  trustedOrigins: [
    "https://skillbridge-chi-seven.vercel.app",
    "https://skillbridge-app-api-inky.vercel.app",
    "http://localhost:3000",
    "http://localhost:4000",
    "http://localhost:5000"
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "STUDENT"
      },
      phone: {
        type: "string",
        required: false
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false
      }
    }
  },
  plugins: [nextCookies()]
});

// src/modules/tutors/tutor.route.ts
import express from "express";

// src/modules/tutors/tutor.service.ts
var createTutorProfile = async (tutorData) => {
  return await prisma.tutorProfile.create({
    data: tutorData
  });
};
var createTutorSlots = async (slotsData, tutorId) => {
  const tutor = await prisma.tutorProfile.findUniqueOrThrow({
    where: { userId: slotsData.id }
  });
  return await prisma.tutorSlot.create({
    data: {
      startTime: slotsData.startTime,
      endTime: slotsData.endTime,
      duration: slotsData.duration,
      teachingMode: slotsData.teachingMode,
      category: slotsData.category,
      hourlyRate: Number(slotsData.hourlyRate) || 0,
      maxStudent: Number(slotsData.maxStudents) || 0,
      isActive: slotsData.isActive,
      tutorId: tutor.id
    }
  });
};
var getTutorProfilesById = async (userId) => {
  return await prisma.tutorProfile.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
};
var getTutorSlot = async (userId) => {
  return await prisma.tutorSlot.findMany({
    where: {
      tutorProfile: {
        userId
      }
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      tutorProfile: {
        select: {
          name: true
        }
      }
    }
  });
};
var getTutorProfiles = async () => {
  return await prisma.tutorProfile.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};
var tutorDashboardCardData = async (tutorId) => {
  const [totalSlot, totalEarning, averageRating, totalBooking] = await Promise.all([
    prisma.tutorSlot.count({
      where: {
        tutorProfile: {
          userId: tutorId
        }
      }
    }),
    prisma.booking.aggregate({
      where: { bookingStatus: "COMPLETED", tutorProfile: { userId: tutorId } },
      _sum: { totalPrice: true }
    }),
    prisma.tutorProfile.aggregate({
      where: { userId: tutorId },
      _avg: { averageRating: true }
    }),
    prisma.booking.count()
  ]);
  return {
    totalSlot,
    totalBooking,
    totalEarning: totalEarning._sum.totalPrice ?? 0,
    averageRating: averageRating._avg.averageRating ?? 0
  };
};
var getSlotChartData = async (tutorId) => {
  console.log(tutorId);
  const booking = await prisma.booking.findMany({
    where: { tutorProfileId: tutorId }
  });
  console.log("booking", booking);
  const result = await prisma.booking.groupBy({
    by: ["createdAt"],
    where: {
      tutorProfile: {
        userId: tutorId
      }
    },
    _sum: {
      totalPrice: true
    },
    orderBy: {
      createdAt: "asc"
    }
  });
  const data = result.map((item) => ({
    date: item.createdAt.toISOString().split("T")[0],
    total: item._sum.totalPrice
  }));
  return data;
};
var tutorSlotsUpdateById = async (tutorId, data) => {
  const slot = await prisma.tutorSlot.findUniqueOrThrow({ where: { id: tutorId } });
  const update = await prisma.tutorSlot.update({
    where: { id: tutorId },
    data
  });
  return update;
};
var tutorProfileUpdateById = async (id, data) => {
  const update = await prisma.tutorProfile.update({
    where: { id },
    data
  });
  return update;
};
var tutorSlotsDeleteById = async (id) => {
  return await prisma.tutorSlot.delete({
    where: { id }
  });
};
var tutorProfileDeleteById = async (id) => {
  const tutor = await prisma.tutorProfile.findUniqueOrThrow({
    where: { id }
  });
  console.log(tutor);
  return await prisma.tutorProfile.delete({
    where: { id: tutor.id }
  });
};
var getAllTutorProfile = async (payload) => {
  let whereConditions = [];
  if (payload.search) {
    whereConditions.push({
      OR: [
        {
          name: {
            contains: payload.search,
            mode: "insensitive"
          }
        },
        {
          education: {
            contains: payload.search,
            mode: "insensitive"
          }
        },
        {
          bio: {
            contains: payload.search,
            mode: "insensitive"
          }
        },
        {
          tutorSlots: {
            every: {
              category: {
                contains: payload.search,
                mode: "insensitive"
              }
            }
          }
        }
      ]
    });
  }
  const result = await prisma.tutorProfile.findMany({
    take: payload.limit,
    skip: payload.skip,
    where: {
      AND: whereConditions
    },
    include: {
      tutorSlots: {
        include: {
          tutorProfile: {
            select: { id: true }
          }
        }
      },
      reviews: true
    },
    orderBy: { averageRating: "asc" }
  });
  const total = await prisma.tutorProfile.count({ where: { AND: whereConditions } });
  return {
    result,
    pagination: {
      total,
      page: payload.page,
      limit: payload.limit,
      totalPage: Math.ceil(total / payload.limit)
    }
  };
};
var GetSingleTutorProfileById = async (id) => {
  return await prisma.tutorProfile.findFirst({
    where: { id },
    include: {
      reviews: true,
      tutorSlots: true
    }
  });
};
var getTutorBooking = async (id, { page, skip, limit }) => {
  const tutor = await prisma.user.findUniqueOrThrow({
    where: { id },
    select: {
      tutorProfiles: {
        select: {
          id: true
        }
      }
    }
  });
  if (!tutor.tutorProfiles[0]) return "Tutor Not Found";
  const tutorId = tutor.tutorProfiles[0].id;
  const result = await prisma.booking.findMany({
    take: limit,
    skip,
    where: {
      tutorProfileId: tutorId
    },
    select: {
      bookingStatus: true,
      paymentStatus: true,
      totalPrice: true,
      tutorProfile: {
        select: {
          name: true
        }
      },
      tutorSlot: {
        select: {
          duration: true,
          startTime: true,
          endTime: true,
          teachingMode: true
        }
      },
      user: {
        select: {
          email: true
        }
      }
    },
    orderBy: { createdAt: "asc" }
  });
  const total = await prisma.booking.count({ where: { tutorProfileId: tutorId } });
  return {
    result,
    pagination: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit)
    }
  };
};
var tutorService = {
  createTutorProfile,
  createTutorSlots,
  getTutorProfiles,
  getTutorProfilesById,
  getTutorSlot,
  tutorDashboardCardData,
  getSlotChartData,
  tutorSlotsUpdateById,
  tutorSlotsDeleteById,
  tutorProfileUpdateById,
  tutorProfileDeleteById,
  getAllTutorProfile,
  GetSingleTutorProfileById,
  getTutorBooking
};

// src/helper/pagination.helper.ts
var PaginationOptions = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 6;
  const skip = (page - 1) * limit;
  const search = options.search || "";
  const sort = options.sort || "all";
  return { page, limit, skip, search, sort };
};

// src/modules/tutors/tutor.controller.ts
var createTutorProfile2 = async (req, res, next) => {
  try {
    const tutor = await tutorService.createTutorProfile(req.body);
    res.status(201).json({
      message: "Tutor profile created successfully",
      data: null
    });
  } catch (error) {
    console.error("Error creating tutor profile:", error);
    next(error);
  }
};
var createTutorSlots2 = async (req, res, next) => {
  try {
    const tutorId = req.user?.id;
    const tutor = await tutorService.createTutorSlots(req.body, tutorId);
    res.status(201).json({
      message: "Tutor profile created successfully",
      data: tutor
    });
  } catch (error) {
    console.error("Error creating tutor profile:", error);
    next(error);
  }
};
var getTutorProfilesById2 = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const tutor = await tutorService.getTutorProfilesById(userId);
    res.status(200).json({
      message: "Tutor profile get successfully",
      data: tutor
    });
  } catch (error) {
    console.error("Error get tutor profile:", error);
    next(error);
  }
};
var getTutorProfiles2 = async (req, res, next) => {
  try {
    const tutor = await tutorService.getTutorProfiles();
    res.status(200).json({
      message: "Tutor profile get successfully",
      data: tutor
    });
  } catch (error) {
    console.error("Error get tutor profile:", error);
    next(error);
  }
};
var getTutorSlot2 = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const tutor = await tutorService.getTutorSlot(userId);
    res.status(200).json({
      message: "Tutor slots get successfully",
      data: tutor
    });
  } catch (error) {
    console.error("Error get tutor slots:", error);
    next(error);
  }
};
var tutorDashboardCardData2 = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const tutor = await tutorService.tutorDashboardCardData(userId);
    res.status(200).json({
      message: "Tutor Dashboard Card Data Get successfully",
      data: tutor
    });
  } catch (error) {
    console.error("Tutor Dashboard Card Data Get :", error);
    next(error);
  }
};
var getSlotChartData2 = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const tutor = await tutorService.getSlotChartData(userId);
    res.status(200).json({
      message: "Tutor Dashboard Chart Data Get successfully",
      data: tutor
    });
  } catch (error) {
    console.error("Tutor Dashboard Chart Data Get :", error);
    next(error);
  }
};
var tutorSlotsUpdateById2 = async (req, res, next) => {
  try {
    const id = req.params.slotId;
    if (!id) return res.status(400).json({ message: "Slot ID required" });
    const tutor = await tutorService.tutorSlotsUpdateById(id, req.body);
    res.status(200).json({
      message: "Tutor Slots Update successfully",
      data: tutor
    });
  } catch (error) {
    next(error);
  }
};
var tutorProfileUpdateById2 = async (req, res, next) => {
  try {
    const id = req.params.profileId;
    if (!id) return res.status(400).json({ message: "Slot ID required" });
    const tutor = await tutorService.tutorProfileUpdateById(id, req.body);
    res.status(200).json({
      message: "Tutor Profile Update successfully",
      data: tutor
    });
  } catch (error) {
    next(error);
  }
};
var tutorSlotsDeleteById2 = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "Slot ID required" });
    const tutor = await tutorService.tutorSlotsDeleteById(id);
    res.status(200).json({
      message: "Tutor Slots Delete successfully",
      data: null
    });
  } catch (error) {
    next(error);
  }
};
var tutorProfileDeleteById2 = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw Error("Slot ID required");
    console.log(id);
    const tutor = await tutorService.tutorProfileDeleteById(id);
    res.status(200).json({
      message: "Tutor Profile Delete successfully",
      data: tutor
    });
  } catch (error) {
    next(error);
  }
};
var getAllTutorProfile2 = async (req, res, next) => {
  try {
    const { skip, limit, search, page } = PaginationOptions(req.query);
    const payload = {
      skip,
      limit,
      search,
      page
    };
    const tutorProfile = await tutorService.getAllTutorProfile(payload);
    res.status(200).json({
      message: "Tutor Profile Get successfully",
      data: tutorProfile
    });
  } catch (error) {
    next(error);
  }
};
var GetSingleTutorProfileById2 = async (req, res, next) => {
  try {
    const id = req.params.id;
    const tutorProfile = await tutorService.GetSingleTutorProfileById(id);
    res.status(200).json({
      message: "Tutor Profile Get successfully",
      data: tutorProfile
    });
  } catch (error) {
    next(error);
  }
};
var getTutorBooking2 = async (req, res, next) => {
  try {
    if (!req.user) return "User not authenticated";
    const { page, skip, limit } = PaginationOptions(req.query);
    const id = req.user?.id;
    console.log("user Id :", id);
    const tutorBooking = await tutorService.getTutorBooking(id, { page, skip, limit });
    res.status(200).json({
      message: "Tutor Booking Get successfully",
      data: tutorBooking
    });
  } catch (error) {
    next(error);
  }
};
var tutorController = {
  createTutorProfile: createTutorProfile2,
  createTutorSlots: createTutorSlots2,
  getTutorProfilesById: getTutorProfilesById2,
  getTutorProfiles: getTutorProfiles2,
  getTutorSlot: getTutorSlot2,
  tutorDashboardCardData: tutorDashboardCardData2,
  getSlotChartData: getSlotChartData2,
  tutorSlotsUpdateById: tutorSlotsUpdateById2,
  tutorSlotsDeleteById: tutorSlotsDeleteById2,
  tutorProfileUpdateById: tutorProfileUpdateById2,
  tutorProfileDeleteById: tutorProfileDeleteById2,
  getAllTutorProfile: getAllTutorProfile2,
  GetSingleTutorProfileById: GetSingleTutorProfileById2,
  getTutorBooking: getTutorBooking2
};

// src/middleware/authVerify.ts
function AuthVerify(...role) {
  return async (req, res, next) => {
    try {
      const session = await auth.api.getSession({ headers: req.headers });
      if (!session || !session.user) {
        return res.status(401).send({ success: false, message: "Your are not authorized Please Login " });
      }
      if (!role.includes(session.user.role)) {
        return res.status(401).send({ success: false, message: "You are not authorized to access this resource" });
      }
      req.user = {
        id: session.user.id,
        name: session.user.name,
        role: session.user.role,
        email: session.user.email,
        emailVerified: session.user.emailVerified
      };
      next();
    } catch (error) {
      next(error);
    }
  };
}
var authVerify_default = AuthVerify;

// src/modules/tutors/tutor.route.ts
var tutorRouter = express();
tutorRouter.get("/booking", authVerify_default("TUTOR" /* TUTOR */), tutorController.getTutorBooking);
tutorRouter.get("/get-profile", authVerify_default("TUTOR" /* TUTOR */), tutorController.getTutorProfilesById);
tutorRouter.get("/get-profile/all", tutorController.getTutorProfiles);
tutorRouter.get("/slots", authVerify_default("TUTOR" /* TUTOR */), tutorController.getTutorSlot);
tutorRouter.get("/dashboard", authVerify_default("TUTOR" /* TUTOR */), tutorController.tutorDashboardCardData);
tutorRouter.get("/dashboard/chart-data", authVerify_default("TUTOR" /* TUTOR */, "ADMIN" /* ADMIN */), tutorController.getSlotChartData);
tutorRouter.get("/", tutorController.getAllTutorProfile);
tutorRouter.get("/:id", tutorController.GetSingleTutorProfileById);
tutorRouter.post("/create", authVerify_default("ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */, "STUDENT" /* STUDENT */), tutorController.createTutorProfile);
tutorRouter.post("/create/slots", authVerify_default("ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */), tutorController.createTutorSlots);
tutorRouter.patch("/slots/update/:slotId", authVerify_default("ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */), tutorController.tutorSlotsUpdateById);
tutorRouter.patch("/profile/update/:profileId", authVerify_default("ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */), tutorController.tutorProfileUpdateById);
tutorRouter.delete("/slots/:id", authVerify_default("ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */), tutorController.tutorSlotsDeleteById);
tutorRouter.delete("/profile/:id", authVerify_default("ADMIN" /* ADMIN */, "TUTOR" /* TUTOR */), tutorController.tutorProfileDeleteById);
var tutorRoute = tutorRouter;

// src/middleware/errorHanding.ts
var errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    message = "Invalid or missing request fields.";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        statusCode = 409;
        message = "This data/user already exists.";
        break;
      case "P2025":
        statusCode = 404;
        message = "Record not found.";
        break;
      case "P2003":
        statusCode = 400;
        message = "Invalid relation. Related record not found.";
        break;
      default:
        statusCode = 400;
        message = "Database error.";
    }
  } else if (err instanceof SyntaxError) {
    statusCode = 400;
    message = "Invalid JSON format.";
  } else if (err instanceof Error) {
    statusCode = 400;
    message = err.message;
  }
  return res.status(statusCode).json({
    success: false,
    message
  });
};

// src/modules/admin/admin.route.ts
import express2 from "express";

// src/modules/admin/admin.service.ts
var createCategory = async (category) => {
  return await prisma.category.create({ data: category });
};
var getCategory = async () => {
  return await prisma.category.findMany({
    orderBy: {
      sortOrder: "asc"
    }
  });
};
var getAdminDashboardCard = async () => {
  const [totalEarning, totalStudent, totalTutor, totalBooking] = await Promise.all([
    prisma.booking.aggregate({
      _sum: { totalPrice: true }
    }),
    prisma.user.count({
      where: {
        role: "STUDENT" /* STUDENT */
      }
    }),
    prisma.user.count({
      where: {
        role: "TUTOR" /* TUTOR */
      }
    }),
    prisma.booking.count()
  ]);
  return {
    totalEarning: totalEarning._sum.totalPrice,
    totalStudent,
    totalTutor,
    totalBooking
  };
};
var adminChartData = async () => {
  const result = await prisma.booking.groupBy({
    by: ["createdAt"],
    where: { paymentStatus: "PAID" },
    _sum: { totalPrice: true },
    orderBy: { createdAt: "asc" }
  });
  const chartData3 = result.map((item) => {
    return {
      date: item.createdAt.toLocaleDateString(),
      price: item._sum.totalPrice
    };
  });
  return chartData3;
};
var getAllUser = async ({ page, limit, skip, search, sort }) => {
  const whereConditions = [];
  if (search) {
    whereConditions.push({
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          email: search
        },
        ...search.length > 10 ? [
          {
            id: search
          }
        ] : []
      ]
    });
  }
  if (sort) {
    if (["STUDENT", "TUTOR", "ADMIN"].includes(sort)) {
      whereConditions.push({
        role: sort
      });
    }
    if (["ACTIVE", "BAN"].includes(sort)) {
      whereConditions.push({
        status: sort
      });
    }
    if (sort === "all") {
    }
  }
  const result = await prisma.user.findMany({
    take: limit,
    skip,
    where: {
      AND: whereConditions
    },
    orderBy: { createdAt: "asc" }
  });
  const total = await prisma.user.count({ where: { AND: whereConditions } });
  return {
    result,
    pagination: {
      total,
      page,
      limit,
      totalPage: Math.ceil(total / limit)
    }
  };
};
var updateUserStatus = async (userId, status) => {
  if (!["ACTIVE", "BAN", "UNBAN"].includes(status)) {
    throw new Error("Invalid status");
  }
  return await prisma.user.update({
    where: { id: userId },
    data: {
      status
    }
  });
};
var getAllBooking = async ({ page, limit, skip }) => {
  const result = await prisma.booking.findMany({
    take: limit,
    skip,
    select: {
      bookingStatus: true,
      paymentStatus: true,
      totalPrice: true,
      tutorProfile: {
        select: {
          name: true
        }
      },
      tutorSlot: {
        select: {
          duration: true,
          startTime: true,
          endTime: true,
          teachingMode: true
        }
      },
      user: {
        select: {
          email: true
        }
      }
    },
    orderBy: { createdAt: "asc" }
  });
  const total = await prisma.booking.count();
  return {
    result,
    pagination: {
      page,
      total,
      limit,
      totalPage: Math.ceil(total / limit)
    }
  };
};
var updateCategory = async (id, payload) => {
  return await prisma.category.update({
    where: { id },
    data: payload
  });
};
var deletedCategory = async (id) => {
  return await prisma.category.delete({ where: { id } });
};
var adminService = {
  createCategory,
  getCategory,
  getAdminDashboardCard,
  adminChartData,
  getAllUser,
  updateUserStatus,
  getAllBooking,
  updateCategory,
  deletedCategory
};

// src/modules/admin/admin.controller.ts
var createCategory2 = async (req, res, next) => {
  try {
    const category = req.body;
    await adminService.createCategory(category);
    res.status(200).json({
      message: "Category Create successfully"
    });
  } catch (error) {
    console.error("Error Create Category:", error);
    next(error);
  }
};
var getCategory2 = async (req, res, next) => {
  try {
    const data = await adminService.getCategory();
    res.status(200).json({
      message: "Get Category successfully",
      data
    });
  } catch (error) {
    console.error("Error Get Category:", error);
    next(error);
  }
};
var getAdminDashboardCard2 = async (req, res, next) => {
  try {
    const data = await adminService.getAdminDashboardCard();
    res.status(200).json({
      message: "successful",
      data
    });
  } catch (error) {
    console.error("Error :", error);
    next(error);
  }
};
var getAllUser2 = async (req, res, next) => {
  try {
    const { page, limit, skip, search, sort } = PaginationOptions(req.query);
    const data = await adminService.getAllUser({ page, limit, skip, search, sort });
    res.status(200).json({
      message: "successful",
      data
    });
  } catch (error) {
    console.error("Error :", error);
    next(error);
  }
};
var adminChartData2 = async (req, res, next) => {
  try {
    const data = await adminService.adminChartData();
    res.status(200).json({
      message: "successful",
      data
    });
  } catch (error) {
    console.error("Error :", error);
    next(error);
  }
};
var updateUserStatus2 = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const status = req.query.status;
    console.log({ userId, status });
    const data = await adminService.updateUserStatus(userId, status);
    res.status(200).json({
      message: "successful",
      data
    });
  } catch (error) {
    console.error("Error :", error);
    next(error);
  }
};
var updateCategory2 = async (req, res, next) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const data = await adminService.updateCategory(id, payload);
    res.status(200).json({
      message: "successful",
      data
    });
  } catch (error) {
    console.error("Error :", error);
    next(error);
  }
};
var deletedCategory2 = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await adminService.deletedCategory(id);
    res.status(200).json({
      message: "successful",
      data
    });
  } catch (error) {
    console.error("Error :", error);
    next(error);
  }
};
var getAllBooking2 = async (req, res, next) => {
  try {
    const { page, limit, skip } = PaginationOptions(req.query);
    const data = await adminService.getAllBooking({ page, limit, skip });
    res.status(200).json({
      message: "successful",
      data
    });
  } catch (error) {
    console.error("Error :", error);
    next(error);
  }
};
var adminController = {
  createCategory: createCategory2,
  getCategory: getCategory2,
  getAdminDashboardCard: getAdminDashboardCard2,
  adminChartData: adminChartData2,
  getAllUser: getAllUser2,
  updateUserStatus: updateUserStatus2,
  getAllBooking: getAllBooking2,
  updateCategory: updateCategory2,
  deletedCategory: deletedCategory2
};

// src/modules/admin/admin.route.ts
var adminRouter = express2();
adminRouter.get("/", (req, res) => {
  res.send("admin route");
});
adminRouter.get("/category", adminController.getCategory);
adminRouter.get("/dashboard", authVerify_default("ADMIN" /* ADMIN */), adminController.getAdminDashboardCard);
adminRouter.get("/dashboard/chart", authVerify_default("ADMIN" /* ADMIN */), adminController.adminChartData);
adminRouter.get("/all-user", authVerify_default("ADMIN" /* ADMIN */), adminController.getAllUser);
adminRouter.get("/all-booking", authVerify_default("ADMIN" /* ADMIN */), adminController.getAllBooking);
adminRouter.post("/category", authVerify_default("ADMIN" /* ADMIN */), adminController.createCategory);
adminRouter.patch("/manage/user/:id", authVerify_default("ADMIN" /* ADMIN */), adminController.updateUserStatus);
adminRouter.patch("/manage/category/:id", authVerify_default("ADMIN" /* ADMIN */), adminController.updateCategory);
adminRouter.delete("/manage/category/:id", authVerify_default("ADMIN" /* ADMIN */), adminController.deletedCategory);
var adminRoute = adminRouter;

// src/modules/student/student.route.ts
import express3 from "express";

// src/helper/timeStringToDate.ts
var timeStringToDate = (time) => {
  const [hour = 0, minute = 0] = time.split(":").map(Number);
  const date = /* @__PURE__ */ new Date();
  date.setHours(hour, minute, 0, 0);
  return date;
};

// src/modules/student/student.service.ts
var getBookingByOwnUser = async (id, page, limit, skip) => {
  const result = await prisma.booking.findMany({
    take: limit,
    skip,
    where: { userId: id },
    select: {
      id: true,
      totalPrice: true,
      createdAt: true,
      paymentStatus: true,
      bookingStatus: true,
      user: {
        select: {
          name: true,
          email: true
        }
      },
      tutorProfile: {
        select: {
          id: true,
          profileImage: true,
          teachingMode: true
        }
      },
      tutorSlot: {
        select: {
          category: true,
          duration: true
        }
      },
      review: true
    },
    orderBy: {
      createdAt: "asc"
    }
  });
  const total = await prisma.booking.count({ where: { userId: id } });
  return {
    result,
    pagination: {
      total,
      page,
      limit,
      totalPage: Number(Math.floor(total / limit))
    }
  };
};
var getStudentDashboard = async (id) => {
  const [totalBooking, accountCreated, completedBooking, pendingBooking, cancelledBooking, totalPrice] = await Promise.all([
    prisma.booking.count(),
    prisma.user.findFirst({ where: { id }, select: { createdAt: true } }),
    prisma.booking.count(
      {
        where: { userId: id, bookingStatus: "COMPLETED" }
      }
    ),
    prisma.booking.count(
      {
        where: { userId: id, bookingStatus: "PENDING" }
      }
    ),
    prisma.booking.count(
      {
        where: { userId: id, bookingStatus: "CANCELLED" }
      }
    ),
    prisma.booking.aggregate({
      where: { userId: id },
      _sum: {
        totalPrice: true
      }
    })
  ]);
  return {
    totalBooking,
    accountCreated,
    completedBooking,
    pendingBooking,
    cancelledBooking,
    totalSpent: totalPrice._sum.totalPrice || 0
  };
};
var chartData = async () => {
  const result = await prisma.booking.groupBy({
    by: ["createdAt"],
    _sum: {
      totalPrice: true
    },
    orderBy: { createdAt: "asc" }
  });
  const chart = result.map((item) => ({
    date: item.createdAt.toLocaleDateString(),
    price: item._sum.totalPrice
  }));
  return chart;
};
var createReview = async (data) => {
  return await prisma.review.create({ data });
};
var upComingBooking = async (userId) => {
  const now = /* @__PURE__ */ new Date();
  const booking = await prisma.booking.findMany({
    where: {
      userId
    },
    include: {
      tutorSlot: true,
      tutorProfile: true,
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });
  return booking.filter((b) => {
    const start = timeStringToDate(b.tutorSlot.startTime);
    return start > now;
  });
};
var pastBooking = async (userId) => {
  const now = /* @__PURE__ */ new Date();
  const booking = await prisma.booking.findMany({
    where: {
      userId
    },
    include: {
      tutorSlot: true,
      tutorProfile: true,
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });
  return booking.filter((b) => {
    const start = timeStringToDate(b.tutorSlot.startTime);
    return start < now;
  });
};
var studentService = {
  getBookingByOwnUser,
  getStudentDashboard,
  chartData,
  createReview,
  upComingBooking,
  pastBooking
};

// src/modules/student/student.controller.ts
var getBookingByOwnUser2 = async (req, res, next) => {
  try {
    const { limit, page, skip } = PaginationOptions(req.query);
    const userId = req.user?.id;
    const booking = await studentService.getBookingByOwnUser(userId, page, limit, skip);
    res.status(201).json({
      message: "Get booking successfully",
      data: booking
    });
  } catch (error) {
    console.error("Error :", error);
    next(error);
  }
};
var getStudentDashboard2 = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const booking = await studentService.getStudentDashboard(userId);
    res.status(201).json({
      message: "Get booking Data successfully",
      data: booking
    });
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
};
var chartData2 = async (req, res, next) => {
  try {
    const booking = await studentService.chartData();
    res.status(201).json({
      message: "successfully",
      data: booking
    });
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
};
var createReview2 = async (req, res, next) => {
  try {
    const data = req.body;
    const id = req.user?.id;
    const payload = {
      ...data,
      userId: id
    };
    const review = await studentService.createReview(payload);
    res.status(201).json({
      message: "successfully",
      data: review
    });
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
};
var upComingBooking2 = async (req, res, next) => {
  try {
    const id = req.user?.id;
    const booking = await studentService.upComingBooking(id);
    res.status(200).json({
      message: "successfully",
      data: booking
    });
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
};
var pastBooking2 = async (req, res, next) => {
  try {
    const id = req.user?.id;
    const booking = await studentService.pastBooking(id);
    res.status(200).json({
      message: "successfully",
      data: booking
    });
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
};
var studentController = {
  getBookingByOwnUser: getBookingByOwnUser2,
  getStudentDashboard: getStudentDashboard2,
  chartData: chartData2,
  createReview: createReview2,
  upComingBooking: upComingBooking2,
  pastBooking: pastBooking2
};

// src/modules/student/student.route.ts
var studentRouter = express3();
studentRouter.get("/upcoming/booking", authVerify_default("STUDENT" /* STUDENT */, "ADMIN" /* ADMIN */), studentController.upComingBooking);
studentRouter.get("/past/booking", authVerify_default("STUDENT" /* STUDENT */, "ADMIN" /* ADMIN */), studentController.pastBooking);
studentRouter.get("/booking", authVerify_default("STUDENT" /* STUDENT */, "ADMIN" /* ADMIN */), studentController.getBookingByOwnUser);
studentRouter.get("/dashboard", authVerify_default("STUDENT" /* STUDENT */, "ADMIN" /* ADMIN */), studentController.getStudentDashboard);
studentRouter.get("/dashboard/chart", authVerify_default("STUDENT" /* STUDENT */, "ADMIN" /* ADMIN */), studentController.chartData);
studentRouter.post("/review", authVerify_default("STUDENT" /* STUDENT */, "ADMIN" /* ADMIN */), studentController.createReview);
var studentRoute = studentRouter;

// src/modules/booking/booking.route.ts
import express4 from "express";

// src/modules/booking/booking.service.ts
var createBooking = async (payload) => {
  const slot = await prisma.tutorSlot.findUnique({
    where: { id: payload.tutorSlotsId }
  });
  if (!slot) throw new Error("Slot not found");
  if (!slot.isActive) throw new Error("Slot not active");
  const serverPrice = Number(slot.hourlyRate * Number(slot.duration)) / 60;
  if (Number(payload.totalPrice) !== Number(serverPrice.toFixed(2))) {
    throw new Error("Price mismatch");
  }
  return await prisma.booking.create({
    data: payload
  });
};
var bookingService = {
  createBooking
};

// src/modules/booking/booking.controller.ts
var createBooking2 = async (req, res, next) => {
  try {
    const payload = req.body;
    console.log(payload);
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json({
      message: " created booking successfully",
      data: booking
    });
  } catch (error) {
    next(error);
  }
};
var bookingController = {
  createBooking: createBooking2
};

// src/modules/booking/booking.route.ts
var bookingRoute = express4();
bookingRoute.post("/", bookingController.createBooking);
var BookingRouter = bookingRoute;

// src/app.ts
import cookieParser from "cookie-parser";
dotenv2.config();
var app = express5();
app.use(cookieParser(config2.betterAuthSecret));
app.use(express5.json());
app.set("trust proxy", 1);
app.use(cors({
  origin: [
    "https://skillbridge-chi-seven.vercel.app",
    "http://localhost:3000",
    "http://localhost:5000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  exposedHeaders: ["Set-Cookie"]
}));
app.all("/api/auth/*splat", toNodeHandler(auth));
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    environment: config2.isProduction ? "production" : "development",
    cookies: req.cookies,
    time: (/* @__PURE__ */ new Date()).toISOString()
  });
});
app.use("/api/tutor", tutorRoute);
app.use("/api/admin", adminRoute);
app.use("/api/student", studentRoute);
app.use("/api/booking", BookingRouter);
app.use(errorHandler);
var app_default = app;

// src/server.ts
async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");
    app_default.listen(config2.appPort, () => {
      console.log(`=================================`);
      console.log(`\u{1F680} Server is running on port ${config2.appPort}`);
      console.log(`\u{1F4DD} Environment: ${config2.isProduction ? "production" : "development"}`);
      console.log(`\u{1F517} BetterAuth URL: ${config2.betterAuthUrl}`);
      console.log(`\u{1F310} App URL: ${config2.appUrl}`);
      console.log(`=================================`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
