import GoogleButton from '~/components/GoogleButton'
import SignInForm from '~/components/SignInForm'

function SigIn() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-2xl font-bold">Sign In</h1>
      <div className="rounded-2xl border border-gray-200 px-5 py-8  xs:my-4 xs:w-[343px] sm:mx-0 sm:my-8 sm:w-[368px] ">
        <div className="text-center">
          <GoogleButton />
        </div>
        <hr className="mx-auto mb-4 mt-8 overflow-visible border-t-[#ccc] text-center text-[#888] before:relative before:-top-3.5 before:bg-white before:px-2 before:py-0 before:content-['or']" />
        <div className="text-center">
          <SignInForm />
        </div>
      </div>
    </div>
  )
}

export default SigIn
