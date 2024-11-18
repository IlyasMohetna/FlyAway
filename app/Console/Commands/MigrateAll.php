<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;

class MigrateAll extends Command
{
    protected $signature = 'migrate:all';
    protected $description = 'Run all migrations in subfolders and clear the database';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $this->line('<fg=cyan>Migrating: default</>');
        $process = new Process(['php', 'artisan', 'migrate:fresh']);
        $process->run(function ($type, $buffer) {
            echo $buffer;
        });

        if (!$process->isSuccessful()) {
            $this->error("Migration failed for: default");
            $this->error("Error Output:\n" . $process->getErrorOutput());
            $this->error("Standard Output:\n" . $process->getOutput());
            return 1;
        }

        $this->info("Migrated: default");

        $folders = ['CONFIG', 'EMPLOYE', 'CLIENT', 'FLIGHT', 'LODGING', 'PACKAGE', 'BUS', 'CAR', 'TRAIN', 'PAYMENT'];

        foreach ($folders as $folder) {
            $this->line("<fg=cyan>Migrating: $folder</>");
            $process = new Process(['php', 'artisan', 'migrate', '--path=database/migrations/' . $folder]);
            $process->run(function ($type, $buffer) {
                echo $buffer;
            });

            if (!$process->isSuccessful()) {
                $this->error("Migration failed for: $folder");
                $this->error("Error Output:\n" . $process->getErrorOutput());
                $this->error("Standard Output:\n" . $process->getOutput());
                return 1;
            }

            $this->info("Migrated: $folder");
        }

        $this->info('<fg=green>All migrations completed successfully.</>');
        return 0;
    }
}
