/**
 * Definire una istanza di `Semigroup` per `Either`
 */
import { Semigroup } from 'fp-ts/Semigroup'
import * as Str from 'fp-ts/string'
import { Either, right, left } from 'fp-ts/Either'

declare const getSemigroup: <E, A>(S: Semigroup<A>) => Semigroup<Either<E, A>>

// ------------------------------------
// tests
// ------------------------------------

import * as assert from 'assert'
import { pipe } from 'fp-ts/function'

const S = getSemigroup<number, string>(Str.Semigroup)

assert.deepStrictEqual(pipe(left(1), S.concat(left(2))), left(1))
assert.deepStrictEqual(pipe(right('a'), S.concat(left(2))), left(2))
assert.deepStrictEqual(pipe(left(1), S.concat(right('b'))), left(1))
assert.deepStrictEqual(pipe(right('a'), S.concat(right('b'))), right('ab'))
