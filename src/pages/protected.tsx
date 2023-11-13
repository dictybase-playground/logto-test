const ProtectedBasic = () => <> Hello Basic User! </>

const ProtectedAdmin = () => {
  return <> Hello, Administrator. </>
}

const access = "PROTECTED"

export { ProtectedBasic, ProtectedAdmin, access }
