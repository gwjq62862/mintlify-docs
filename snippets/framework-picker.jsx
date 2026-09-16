export const FrameworkPicker = () => {
  const [active, setActive] = useState("next")
  const tabClass = (name) =>
    `flex flex-col items-center gap-3 rounded-xl border p-6 transition-colors cursor-pointer ${active === name
      ? "border-primary bg-primary/10 text-primary"
      : "border-gray-200 bg-gray-50 hover:border-gray-300 dark:border-white/10 dark:bg-white/5"
    }`
  const chipClass =
    "flex items-center justify-center rounded-lg bg-gray-100 p-2.5 dark:bg-white"

  return (
    <div className="not-prose">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button type="button" className={tabClass("next")} onClick={() => setActive("next")}>
          <span className={chipClass}>
            <img src="/logo/nextjs-icon-svgrepo-com.svg" alt="Next.js logo" width={40} height={40} />
          </span>
          <span className="text-base font-semibold">Next.js</span>
        </button>
        <button type="button" className={tabClass("nest")} onClick={() => setActive("nest")}>
          <span className={chipClass}>
            <img src="/logo/nest-middleware-js-svgrepo-com.svg" alt="NestJS logo" width={40} height={40} />
          </span>
          <span className="text-base font-semibold">NestJS</span>
        </button>
        <button type="button" className={tabClass("express")} onClick={() => setActive("express")}>
          <span className={chipClass}>
            <img src="/logo/express.svg" alt="Express logo" width={40} height={40} />
          </span>
          <span className="text-base font-semibold">Express</span>
        </button>
      </div>

      {active === "next" && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold">1. Install</h3>
          <CodeBlock language="bash">{`npm i @snaplog/next`}</CodeBlock>

          <h3 className="text-lg font-semibold">2. Create Logger</h3>
          <CodeBlock language="ts" filename="lib/logger.ts">{`// lib/logger.ts
import { createLogger } from '@snaplog/next'

export const logger = createLogger({
  apiKey: process.env.SNAPLOG_API_KEY!,
  appName: 'my-app',
  environment: process.env.NODE_ENV || 'development'
})`}</CodeBlock>

          <h3 className="text-lg font-semibold">3. Log Anywhere</h3>
          <CodeBlock language="ts">{`// Server Component / Route Handler / Server Action
import { logger } from '@/lib/logger'

export async function POST(request: Request) {
  const body = await request.json()
  logger.info('User created', {
    track: { userId: body.id, email: body.email },
    metrics: { latencyMs: 12, dbQueryCount: 1 },
    subsystem: 'auth',
    operation: 'signup'
  })
  return Response.json({ ok: true })
}`}</CodeBlock>

          <h3 className="text-lg font-semibold">4. Verify</h3>
          <p>Open your <a href="https://app.snaplogs.com" target="_blank" rel="noreferrer">SnapLog Dashboard</a> → <strong>Logs</strong> → See your entry</p>
        </div>
      )}

      {active === "nest" && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold">1. Install</h3>
          <CodeBlock language="bash">{`npm i @snaplog/nest`}</CodeBlock>

          <h3 className="text-lg font-semibold">2. Register Module</h3>
          <CodeBlock language="ts" filename="app.module.ts">{`// app.module.ts
import { Module } from '@nestjs/common'
import { SnapLogModule } from '@snaplog/nest'

@Module({
  imports: [
    SnapLogModule.forRoot({
      apiKey: process.env.SNAPLOG_API_KEY!,
      baseUrl: 'https://api.snaplogs.com/api/v1',
      appName: 'my-app',
      environment: process.env.NODE_ENV || 'development'
    })
  ]
})
export class AppModule {}`}</CodeBlock>

          <h3 className="text-lg font-semibold">3. Use in Services</h3>
          <CodeBlock language="ts" filename="user.service.ts">{`// user.service.ts
import { Injectable } from '@nestjs/common'
import { SnapLogService } from '@snaplog/nest'

@Injectable()
export class UserService {
  constructor(private readonly logs: SnapLogService) {}

  async createUser(data: CreateUserDto) {
    this.logs.info('User created', {
      track: { userId: data.id, email: data.email },
      metrics: { latencyMs: 12, dbQueryCount: 1 },
      subsystem: 'auth',
      operation: 'signup'
    })
    return user
  }
}`}</CodeBlock>

          <h3 className="text-lg font-semibold">4. Or Use Decorators</h3>
          <CodeBlock language="ts">{`@Post()
@Log({ type: 'audit', importance: 'medium', subsystem: 'auth', operation: 'signup' })
@Track({ context: 'user-signup', attributes: { source: 'api' } })
async create(@Body() data: CreateUserDto) {
  return this.userService.create(data)
}`}</CodeBlock>

          <h3 className="text-lg font-semibold">5. Verify</h3>
          <p>Open your <a href="https://app.snaplogs.com" target="_blank" rel="noreferrer">SnapLog Dashboard</a> → <strong>Logs</strong> → See your entry</p>
        </div>
      )}

      {active === "express" && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold">1. Install</h3>
          <CodeBlock language="bash">{`npm i @snaplog/express`}</CodeBlock>

          <h3 className="text-lg font-semibold">2. Create Logger</h3>
          <CodeBlock language="ts" filename="log.ts">{`// log.ts
import { createLogger } from '@snaplog/express'

export const log = createLogger({
  apiKey: process.env.SNAPLOG_API_KEY!,
  appName: 'my-app',
  environment: process.env.NODE_ENV || 'development'
})`}</CodeBlock>

          <h3 className="text-lg font-semibold">3. Attach Middleware</h3>
          <CodeBlock language="ts" filename="app.ts">{`// app.ts
import express from 'express'
import { snapLogMiddleware, snapLogErrorHandler } from '@snaplog/express'
import { log } from './log'

const app = express()

app.use(snapLogMiddleware(log, { autoLog: true }))

// ...routes...

app.use(snapLogErrorHandler(log))`}</CodeBlock>

          <h3 className="text-lg font-semibold">4. Log Anywhere</h3>
          <CodeBlock language="ts">{`app.post('/users', (req, res) => {
  log.info('User created', {
    track: { userId: req.body.id },
    subsystem: 'auth',
    operation: 'signup'
  })
  return res.json({ ok: true })
})`}</CodeBlock>

          <h3 className="text-lg font-semibold">5. Verify</h3>
          <p>Open your <a href="https://app.snaplogs.com" target="_blank" rel="noreferrer">SnapLog Dashboard</a> → <strong>Logs</strong> → See your entry</p>
        </div>
      )}
    </div>
  )
}
