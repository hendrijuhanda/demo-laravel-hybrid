<?php

namespace Modules\Transaction\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Transaction\Repositories\Contracts\TransactionRepositoryInterface;
use Modules\Transaction\Repositories\TransactionRepository;
use Modules\Transaction\Services\Contracts\TransactionServiceInterface;
use Modules\Transaction\Services\TransactionService;

class TransactionServiceProvider extends ServiceProvider
{
    protected string $moduleName = 'Transaction';

    protected string $moduleNameLower = 'transaction';

    /**
     * Boot the application events.
     */
    public function boot(): void
    {
    }

    /**
     * Register the service provider.
     */
    public function register(): void
    {
        $this->app->register(RouteServiceProvider::class);

        $this->app->bind(TransactionRepositoryInterface::class, TransactionRepository::class);
        $this->app->bind(TransactionServiceInterface::class, TransactionService::class);
    }

    /**
     * Get the services provided by the provider.
     */
    public function provides(): array
    {
        return [];
    }
}
