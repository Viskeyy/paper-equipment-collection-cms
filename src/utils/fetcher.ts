import type { Fetcher } from 'swr';

type QueryValue = string | number | boolean | null | undefined;

export type FetcherQueryParams = Record<string, QueryValue>;

export type FetcherKey = string | [string, FetcherQueryParams];

export interface MutationFetcherOptions<TArg> {
    arg: TArg;
}

export class FetchError extends Error {
    status: number;
    info?: unknown;
    constructor(message: string, status: number, info?: unknown) {
        super(message);
        this.name = 'FetchError';
        this.status = status;
        this.info = info;
    }
}

export const TOKEN_KEY = 'token';

const baseUrl = 'http://localhost:8080';

const buildUrl = (url: string, params?: FetcherQueryParams): string => {
    const requestUrl = new URL(baseUrl + url);

    if (!params) return requestUrl.toString();

    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') return;
        requestUrl.searchParams.set(key, String(value));
    });

    return requestUrl.toString();
};

const buildHeaders = (init?: HeadersInit): Headers => {
    const headers = new Headers(init);
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) headers.set('Authorization', `Bearer ${token}`);
    if (!headers.has('Accept')) headers.set('Accept', 'application/json');
    return headers;
};

const parseResponse = async (res: Response) => {
    if (!res.ok) {
        const info = await res.json().catch(() => undefined);
        throw new FetchError(`Request failed: ${res.status} ${res.statusText}`, res.status, info);
    }

    return res.json();
};

export const fetcher: Fetcher<unknown, FetcherKey> = async (key: FetcherKey) => {
    const [url, params] = Array.isArray(key) ? key : [key, undefined];
    const res = await fetch(buildUrl(url, params), { headers: buildHeaders() });

    return parseResponse(res);
};

export const postJson = async <TResponse, TBody>(
    url: string,
    { arg }: MutationFetcherOptions<TBody>,
): Promise<TResponse> => {
    const res = await fetch(buildUrl(url), {
        method: 'POST',
        headers: buildHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(arg),
    });

    return parseResponse(res) as Promise<TResponse>;
};
