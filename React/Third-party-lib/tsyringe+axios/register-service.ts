import { container, instanceCachingFactory } from 'tsyringe';

export type Service<T> = { new (): T } & { TOKEN: symbol | string };

export function registerService<T>(service: Service<T>) {
    if (!container.isRegistered(service.TOKEN)) {
        container.register<T>(service.TOKEN, {
            useFactory: instanceCachingFactory<T>(c => c.resolve<T>(service)),
        });
    }
}

export function registerAndResolveService<T>(service: Service<T>) {
    registerService(service);

    return container.resolve<T>(service.TOKEN);
}

export function resolveService<T>(service: Service<T>) {
    return container.resolve<T>(service.TOKEN);
}
