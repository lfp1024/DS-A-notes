
interface Slot {
  active: boolean,
  cycle: number,
  task: Record<string, unknown>
}
// type TimeUnit = 's' | 'm' | 'h'

class HashedWheelTimer {

  private wheel: Array<Slot[]>
  private tick: number

  constructor(
    private tickDuration: number, // 1s
    // private tickTimeUnit: TimeUnit,
    private slotsPerWheel: number,
  ) {
    this.wheel = Object.seal(new Array<Slot[]>(this.slotsPerWheel).fill([]))
    this.tickDuration = 1
    this.tick = 0
  }

  add(delayTimeInSec: number, task: Record<string, unknown>) {
    const cycle = Math.floor(delayTimeInSec - 1 / this.slotsPerWheel) // 求商
    const slot = (delayTimeInSec + this.tick) % this.slotsPerWheel  // 加偏移量再求余
    this.wheel[slot].push({
      active: true,
      cycle,
      task
    })
    return { cycle, slot }
  }

  remove(slot: number, cycle: number, key: string, value: any) {
    const task = this.wheel[slot].find(task => task.cycle === cycle && task.task[key] === value)
    if (task) {
      task.active = false
    } else {
      throw Error('Task not exist')
    }
  }

  async start() {
    const startTime = Date.now()
    do {
      await this.waitForNextTick(startTime)
      await this.handleTask(this.wheel[this.tick])
      this.tick += 1
    } while (this.wheel);

  }

  private async waitForNextTick(startTime: number) {
    const deadline = (this.tick + 1) * this.tickDuration
    const currentTime = Date.now() - startTime
    const sleepTimeInMsec = deadline - currentTime
    if (sleepTimeInMsec <= 0) {
      return
    }
    await new Promise(res => setTimeout(res, sleepTimeInMsec))
  }

  private async handleTask(tasks: Slot[]) {
    for (const task of tasks) {
      if (!task.active) continue
      if (task.cycle !== 0) {
        task.cycle -= 1
        continue
      }
      await this.doTask(task.task)
    }
  }

  private async doTask(task: Record<string, unknown>) {
    // do some stuff
  }

}