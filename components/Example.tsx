import React from 'react'
import useSWR from 'swr'
import { useDebounce, useKeyPress } from 'ahooks'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { RepositoryOption } from './RepositoryOption'
import { FaceSmileIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'

export type Repository = {
  id: string
  name: string
  full_name: string
  open_issues_count: number
  stargazers_count: number
  forks_count: number
  html_url: string
  url: string
  language: string
  owner: {
    login: string
    avatar_url: string
  }
}

type APIResponse = { items: Repository[] }

const fetcher = ([url, query]: [string, string]) =>
  fetch(url + `?q=${query}`).then((res) => res.json())

export default function Example() {
  const [open, setOpen] = React.useState(true)
  const [rawQuery, setRawQuery] = React.useState('')
  const query = rawQuery.toLowerCase().replace(/^[#>]/, '')
  const debouncedQuery = useDebounce(query, { wait: 600 })

  const {
    data,
    error,
    isValidating: isLoading,
  } = useSWR<APIResponse>(
    debouncedQuery ? ['/api/search', debouncedQuery] : null,
    fetcher
  )

  useKeyPress('meta.k', () => setOpen(true))
  useKeyPress('esc', () => setOpen(false))

  return (
    <Transition.Root
      show={open}
      as={React.Fragment}
      afterLeave={() => setRawQuery('')}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-40 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-500 divide-opacity-20 overflow-hidden rounded-2xl shadow-slate-300/10 bg-slate-900/70 shadow-2xl ring-1 ring-sky-500 ring-opacity-5 backdrop-blur-xl backdrop-filter transition-all">
              <Combobox
                value=""
                onChange={(item) => {
                  window.open(item, '_blank')
                }}
              >
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-100 placeholder-gray-500 focus:ring-0 sm:text-sm focus:outline-0"
                    placeholder="Search GitHub repos..."
                    onChange={(event) => setRawQuery(event.target.value)}
                  />
                </div>

                <Combobox.Options
                  static
                  className="max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto p-4 pb-2"
                >
                  {isLoading ? (
                    'Loading...'
                  ) : (
                    <li>
                      <h2 className="text-xs font-semibold text-gray-200">
                        Repositories
                      </h2>
                      <ul className="-mx-4 mt-2 text-sm text-gray-700 space-y-0.5">
                        {data?.items.map((item) => (
                          <RepositoryOption key={item.id} repository={item} />
                        ))}
                      </ul>
                    </li>
                  )}
                </Combobox.Options>
                <span className="flex flex-wrap items-center bg-slate-900/20 py-2.5 px-4 text-xs text-gray-400">
                  <FaceSmileIcon className="w-4 h-4 mr-1" />
                  Welcome to Zolplay&apos;s React Interview Challenge.
                </span>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
