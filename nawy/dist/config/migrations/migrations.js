"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../db");
const migrationFiles = ['./seed_apt_migration'];
const migrate = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('Connecting to the database...');
    yield (0, db_1.connect)();
    if (!db_1.corePapr.db) {
        throw new Error('Database connection was not initialized. Ensure connect() was called properly.');
    }
    const migrationStateCollection = db_1.corePapr.db.collection('migrationState');
    for (const file of migrationFiles) {
        const migrationName = (_a = file.split('/').pop()) === null || _a === void 0 ? void 0 : _a.replace('.ts', '');
        if (!migrationName) {
            console.error('Invalid migration file name.');
            continue;
        }
        // Check if the migration has already been applied
        const alreadyApplied = yield migrationStateCollection.findOne({ name: migrationName });
        if (alreadyApplied) {
            console.log(`Skipping migration "${migrationName}" (already applied).`);
            continue;
        }
        console.log(`Applying migration: ${migrationName}`);
        try {
            const module = yield Promise.resolve(`${file}`).then(s => __importStar(require(s)));
            if (typeof module.migrate !== 'function') {
                console.error(`Migration file "${migrationName}" has no "migrate" function.`);
                continue;
            }
            yield module.migrate();
            console.log(`Migration "${migrationName}" applied successfully.`);
            // Record the migration as applied
            yield migrationStateCollection.insertOne({ name: migrationName, appliedAt: new Date() });
        }
        catch (error) {
            console.error(`Error applying migration "${migrationName}":`, error);
        }
    }
    console.log('All migrations complete.');
    yield (0, db_1.disconnect)();
});
migrate()
    .then(() => process.exit(0))
    .catch((err) => {
    console.error('Migration process failed:', err);
    process.exit(1);
});
