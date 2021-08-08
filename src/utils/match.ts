import { PropType } from 'src/shared/types/data.type'

interface Info {
  condition: boolean
  method(arg?: unknown): unknown
}

interface InfoFactory {
  on(newInfo: Info): this

  otherwise(newInfo: Info): PropType<Info, 'method'>
}

export default function match(info: Info): InfoFactory {
  class Match implements InfoFactory {
    private infoList: Info[]

    constructor() {
      this.infoList = [info]
    }

    private addInfoList(newInfo: Info) {
      const currentInfoList = this.infoList

      this.infoList = [...currentInfoList, newInfo]
    }

    public on(newInfo: Info) {
      this.addInfoList(newInfo)
      return this
    }

    public otherwise(newInfo: Info) {
      this.addInfoList(newInfo)
      return this.execute()
    }

    private execute() {
      return (...initialArguments: unknown[]) => {
        const executeTarget = this.infoList.find((value: Info) => Boolean(value.condition))

        return executeTarget?.method(...initialArguments)
      }
    }
  }

  return new Match()
}
