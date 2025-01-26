import { connect, disconnect, corePapr } from '../db';

const migrationFiles = ['./seed_apt_migration'];

const migrate = async () => {
  await connect(); 
  
  if (!corePapr.db) {
    throw new Error('Database connection was not initialized. Ensure connect() was called properly.');
  }

  const migrationStateCollection = corePapr.db.collection('migrationState');

  for (const file of migrationFiles) {
    const migrationName = file.split('/').pop()?.replace('.ts', '');
    if (!migrationName) {
      continue;
    }

    // Skip already-applied migrations
    const alreadyApplied = await migrationStateCollection.findOne({ name: migrationName });
    if (alreadyApplied) {
      continue;
    }

    try {
      const module = await import(file); // Dynamically import the migration file
      if (typeof module.migrate !== 'function') {
        continue;
      }

      await module.migrate(); // Execute the migration logic

      // Record the migration as applied
      await migrationStateCollection.insertOne({ name: migrationName, appliedAt: new Date() });
    } catch (error) {
      throw new Error(`Error applying migration "${migrationName}": ${error}`,);

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
