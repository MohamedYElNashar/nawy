import { connect, disconnect, corePapr } from '../db';

const migrationFiles = ['./seed_apt_migration'];

const migrate = async () => {
  console.log('Connecting to the database...');
  await connect(); 

  if (!corePapr.db) {
    throw new Error('Database connection was not initialized. Ensure connect() was called properly.');
  }

  const migrationStateCollection = corePapr.db.collection('migrationState'); 

  for (const file of migrationFiles) {
    const migrationName = file.split('/').pop()?.replace('.ts', '');
    if (!migrationName) {
      console.error('Invalid migration file name.');
      continue;
    }

    // Check if the migration has already been applied
    const alreadyApplied = await migrationStateCollection.findOne({ name: migrationName });
    if (alreadyApplied) {
      console.log(`Skipping migration "${migrationName}" (already applied).`);
      continue;
    }

    console.log(`Applying migration: ${migrationName}`);
    try {
      const module = await import(file);
      if (typeof module.migrate !== 'function') {
        console.error(`Migration file "${migrationName}" has no "migrate" function.`);
        continue;
      }

      await module.migrate();
      console.log(`Migration "${migrationName}" applied successfully.`);

      // Record the migration as applied
      await migrationStateCollection.insertOne({ name: migrationName, appliedAt: new Date() });
    } catch (error) {
      console.error(`Error applying migration "${migrationName}":`, error);
    }
  }

  console.log('All migrations complete.');
  await disconnect();
};

migrate()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Migration process failed:', err);
    process.exit(1);
  });
