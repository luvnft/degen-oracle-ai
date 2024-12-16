import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Input } from '../form/Input'

interface AddTokenModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (tokenAddress: string) => void
}

export default function AddTokenModal({ isOpen, onClose, onSubmit }: AddTokenModalProps) {
  const [tokenAddress, setTokenAddress] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!tokenAddress) {
      setError('โปรดระบุที่อยู่โทเค็น')
      return
    }

    // Basic Solana address validation
    if (!/^[A-HJ-NP-Za-km-z1-9]{32,44}$/.test(tokenAddress)) {
      setError('ที่อยู่โทเค็นไม่ถูกต้อง')
      return
    }

    onSubmit(tokenAddress)
    setTokenAddress('')
    setError('')
    onClose()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-[#111111] p-6 text-left align-middle shadow-xl transition-all border border-[#333333]">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title as="h3" className="text-lg font-medium text-white">
                    เพิ่มโทเค็นใหม่
                  </Dialog.Title>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mt-4">
                    <label htmlFor="tokenAddress" className="block text-sm text-gray-400 mb-2">
                      ที่อยู่โทเค็น
                    </label>
                    <Input
                      type="text"
                      id="tokenAddress"
                      className="w-full bg-black border border-[#333333] rounded-md p-2 text-white focus:outline-none focus:border-[#88D693] focus:ring-1 focus:ring-[#88D693]"
                      value={tokenAddress}
                      onChange={(e) => setTokenAddress(e.target.value)}
                      placeholder="ระบุที่อยู่โทเค็น Solana"
                    />
                    {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm text-gray-400 hover:text-white"
                      onClick={onClose}
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm bg-[#88D693] text-black rounded-md hover:bg-opacity-90"
                    >
                      เพิ่มโทเค็น
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 