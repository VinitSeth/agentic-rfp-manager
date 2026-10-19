import "dotenv/config";

import mongoose from "mongoose";

import {
  connectDatabase,
  disconnectDatabase
} from "../config/database.js";

import {
  TenantModel
} from "../models/tenant.model.js";

import {
  UserModel
} from "../models/user.model.js";

import {
  TenantMembershipModel
} from "../models/tenant-membership.model.js";

import {
  RfpModel
} from "../models/rfp.model.js";

import {
  AgentRunModel
} from "../models/agent-run.model.js";

async function initializeModels(): Promise<void> {
  /*
   * Model.init() creates/initializes the model's
   * indexes and ensures the collection exists.
   */
  await Promise.all([
    TenantModel.init(),
    UserModel.init(),
    TenantMembershipModel.init(),
    RfpModel.init(),
    AgentRunModel.init()
  ]);
}

async function clearPocData(): Promise<void> {
  /*
   * Delete dependent collections first.
   */
  await Promise.all([
    AgentRunModel.deleteMany({}),
    RfpModel.deleteMany({}),
    TenantMembershipModel.deleteMany({})
  ]);

  await Promise.all([
    UserModel.deleteMany({}),
    TenantModel.deleteMany({})
  ]);
}

async function seed(): Promise<void> {
  await connectDatabase();

  await initializeModels();
  await clearPocData();

  const [
    northstarTenant,
    bluePeakTenant
  ] = await TenantModel.create([
    {
      name:
        "Northstar Manufacturing",

      slug:
        "northstar",

      status:
        "ACTIVE",

      settings: {
        currency:
          "INR",

        timezone:
          "Asia/Kolkata"
      }
    },
    {
      name:
        "BluePeak Telecom",

      slug:
        "bluepeak",

      status:
        "ACTIVE",

      settings: {
        currency:
          "INR",

        timezone:
          "Asia/Kolkata"
      }
    }
  ]);

  const procurementUser =
    await UserModel.create({
      displayName:
        "Demo Procurement User",

      email:
        "demo-procurement@example.com",

      identityProviderId:
        "demo-procurement-user",

      status:
        "ACTIVE"
    });

  const auditorUser =
    await UserModel.create({
      displayName:
        "Demo Auditor User",

      email:
        "demo-auditor@example.com",

      identityProviderId:
        "demo-auditor-user",

      status:
        "ACTIVE"
    });

  await TenantMembershipModel.create([
    {
      tenantId:
        northstarTenant._id,

      userId:
        procurementUser._id,

      role:
        "PROCUREMENT_MANAGER",

      permissions:
        [],

      status:
        "ACTIVE"
    },
    {
      tenantId:
        bluePeakTenant._id,

      userId:
        procurementUser._id,

      role:
        "PROCUREMENT_MANAGER",

      permissions:
        [],

      status:
        "ACTIVE"
    },
    {
      tenantId:
        northstarTenant._id,

      userId:
        auditorUser._id,

      role:
        "AUDITOR",

      permissions:
        [],

      status:
        "ACTIVE"
    }
  ]);

  const [
    northstarRfp,
    bluePeakRfp
  ] = await RfpModel.create([
    {
      tenantId:
        northstarTenant._id,

      rfpNumber:
        "RFP-2026-001",

      title:
        "Network Equipment Procurement",

      category:
        "IT_INFRASTRUCTURE",

      requirementBrief:
        "Procure network equipment and installation services for three office locations, including switches, routers, implementation and one year of technical support.",

      budget: {
        amount:
          5_000_000,

        currency:
          "INR"
      },

      submissionDeadline:
        null,

      status:
        "DRAFT",

      requirementAnalysisRunId:
        null,

      createdBy:
        procurementUser._id,

      updatedBy:
        procurementUser._id,

      version:
        1
    },
    {
      tenantId:
        bluePeakTenant._id,

      /*
       * The same RFP number is intentional.
       * Uniqueness is tenant-scoped.
       */
      rfpNumber:
        "RFP-2026-001",

      title:
        "Telecom Monitoring Platform",

      category:
        "TELECOM_SOFTWARE",

      requirementBrief:
        "Acquire a telecom network monitoring platform with operational dashboards, configurable alerts, integration support and implementation services.",

      budget: {
        amount:
          8_000_000,

        currency:
          "INR"
      },

      submissionDeadline:
        null,

      status:
        "DRAFT",

      requirementAnalysisRunId:
        null,

      createdBy:
        procurementUser._id,

      updatedBy:
        procurementUser._id,

      version:
        1
    }
  ]);

  console.info(
    "[seed] POC data created successfully"
  );

  console.info(
    `[seed] Northstar tenant ID: ${northstarTenant._id.toString()}`
  );

  console.info(
    `[seed] BluePeak tenant ID: ${bluePeakTenant._id.toString()}`
  );

  console.info(
    `[seed] Procurement user ID: ${procurementUser._id.toString()}`
  );

  console.info(
    `[seed] Northstar RFP ID: ${northstarRfp._id.toString()}`
  );

  console.info(
    `[seed] BluePeak RFP ID: ${bluePeakRfp._id.toString()}`
  );
}

seed()
  .catch((error: unknown) => {
    console.error(
      "[seed] Failed to create POC data",
      error
    );

    process.exitCode = 1;
  })
  .finally(async () => {
    if (
      mongoose.connection.readyState !== 0
    ) {
      await disconnectDatabase();
    }
  });