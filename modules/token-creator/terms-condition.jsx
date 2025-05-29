import { IconX } from "@tabler/icons-react";
import React, { Fragment, useEffect } from "react";

const TermAndCondition = ({ open, setOpen }) => {
  useEffect(() => {
    if (open) {
      document.getElementById("my_modal_2").showModal();
    } else {
      document.getElementById("my_modal_2").close();
    }
  }, [open]);

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box relative bg-background">
        <p className="font-semibold">Terms & Conditions</p>
        <div className="py-2 flex ">
          <div className="modal-action absolute -top-6 right-0 p-6">
            <button
              className="cursor-pointer"
              onClick={() => {
                setOpen(false);
                document.getElementById("my_modal_2").close();
              }}
            >
              <IconX />
            </button>
          </div>
        </div>
        <form method="dialog " className="overflow-x-auto max-h-56">
          <Fragment>
            <p>
              TAN DApps(the "Platform"), is a service provided on SmartContracts
              Tools by TAN (the "Company").
            </p>
            <br />
            <p>
              By accessing or using the Platform, you agree to be bound by these
              Terms and Conditions (the "Agreement").
            </p>
            <br />
            <p>
              If you do not agree to these terms, you must refrain from using
              the Platform.
            </p>
            <br />
            <p>
              <strong>NOTE</strong>
            </p>
            <p>
              To most easily use the Platform, you must first install a Web3
              Wallet (e.g. MetaMask). A Web3 Wallet is an electronic wallet,
              which allows you to purchase, store, and engage in transactions
              using native currency on evm compatible blockchains. You will not
              be able to engage in any transactions on the Platform other than
              through Web3 Wallets. We neither own nor control Web3 Wallets, the
              blockchain network, or any other third party site, product, or
              service that you might access, visit, or use for the purpose of
              enabling you to use the various features of the Platform. We will
              not be liable for the acts or omissions of any such third parties,
              nor will we be liable for any damage that you may suffer as a
              result of your transactions or any other interaction with any such
              third parties. Transactions that take place on the Platform are
              managed and confirmed via the blockchain. You understand that your
              public address will be made publicly visible whenever you engage
              in a transaction on the Platform.
            </p>
            <br />
            <p>
              <strong>We will never ask you to share your private keys.</strong>
            </p>
            <br />
            <ol>
              <li>
                <strong> Introduction</strong>
              </li>
            </ol>
            <br />
            <p>
              1.1. This Agreement governs your use of the Token Creator tool
              (the "Service").
            </p>
            <p>
              1.2. The Service allows users to create blockchain-based tokens on
              TAN network
            </p>
            <br />
            <ol start="2">
              <li>
                <strong> Eligibility</strong>
              </li>
            </ol>
            <br />
            <p>
              2.1. You must be at least 18 years old or the age of majority in
              your jurisdiction to use the Service.
            </p>
            <p>
              2.2. By using the Platform, you represent that you are legally
              permitted to use blockchain technology and smart contracts in your
              jurisdiction.
            </p>
            <br />
            <ol start="3">
              <li>
                <strong> Intellectual Property</strong>
              </li>
            </ol>
            <br />
            <p>
              3.1. All intellectual property rights, including but not limited
              to the Token Creator tool, its design, algorithms, user interface,
              documentation, and any custom smart contract templates, remain the
              exclusive property of the Company.
            </p>
            <p>
              3.2. You are granted a limited, non-exclusive, non-transferable,
              and revocable license to use the Service solely for its intended
              purpose.
            </p>
            <p>
              3.3. The tokens and smart contracts you generate using the Service
              are your responsibility. While the underlying tools provided are
              proprietary, the tokens and smart contracts you create are not
              owned by the Company.
            </p>
            <p>
              3.4. You may not reproduce, distribute, modify, reverse engineer,
              or create derivative works from the Platform or any of its
              components without prior written consent from the Company.
            </p>
            <br />
            <ol start="4">
              <li>
                <strong> User Responsibilities</strong>
              </li>
            </ol>
            <br />
            <p>
              4.1. You are solely responsible for the accuracy of the data and
              configurations you input into the Platform.
            </p>
            <p>
              4.2. The tokens you create using the Service must comply with
              applicable laws, regulations, and third-party terms.
            </p>
            <p>
              4.3. You agree not to use the Platform for any unlawful,
              fraudulent, or malicious purposes.
            </p>
            <br />
            <ol start="5">
              <li>
                <strong> Supported Networks</strong>
              </li>
            </ol>
            <br />
            <p>
              5.1. The Platform currently supports only TAN Blockchain network.
            </p>
            <p>
              5.2. The availability of other networks may change without notice.
            </p>
            <br />
            <ol start="6">
              <li>
                <strong> Fees and Payments</strong>
              </li>
            </ol>
            <br />
            <p>
              6.1. Fees for using the Service are outlined on the Platform and
              are subject to change.
            </p>
            <p>
              6.2. Payments are processed in each blockchain native currency.
              You are responsible for any transaction fees, including gas costs,
              associated with the use of the Platform.
            </p>
            <p>
              6.3. Any financial transactions that you engage on the Platform is
              conducted solely through the blockchain network via Web3 Wallets.
            </p>
            <p>
              6.4. We have no insight into or control over these payments or
              transactions, nor do we have the ability to reverse or refund any
              transactions. With that in mind, we have no liability to you or to
              any third party for any claims or damages that may arise as a
              result of any transactions that you engage in via the Platform, or
              using the Smart Contracts, or any other transactions that you
              conduct via the blockchain network or Web3 Wallet.
            </p>
            <p>
              6.5. The blockchain network requires the payment of a transaction
              fee (a &ldquo;Gas Fee&rdquo;) for every transaction that occurs on
              the blockchain network. The Gas Fee funds the network of computers
              that run the decentralized blockchain network. This means that you
              need to pay a Gas Fee for each transaction that occurs via the
              Platform. Gas Fee depends on Gas Limit and on current Gas price
              average. Your Web3 Wallet suggests both when you use the Platform.
              Do not decrease Gas Limit to avoid transaction to fail. If you
              want, you can decrease Gas Price but your transaction could remain
              pending for minutes/hours. Do not send the same transaction
              multiple times. Duplicate or failed transactions can't be
              refunded.
            </p>
            <p>
              6.6. In addition to the Gas Fee, each time you utilize a Smart
              Contract to conduct a transaction via the Platform, you authorize
              us to collect a one-time commission of an amount of native
              currency of the total value of that transaction (each, a
              &ldquo;Commission&rdquo;). Commission will be publicly visible on
              the Platform confirmation page and in Web3 Wallet confirmation
              popup. You acknowledge and agree that the Commission will be
              transferred directly to us through the blockchain network as part
              of your payment. We do not collect a Commission for interactions
              that do not involve our Platform.
            </p>
            <br />
            <ol start="7">
              <li>
                <strong> Disclaimer of Warranties</strong>
              </li>
            </ol>
            <br />
            <p>
              7.1. The Service is provided "as-is" and "as available," without
              any express or implied warranties.
            </p>
            <p>
              7.2. The Company makes no guarantees regarding the functionality,
              security, or availability of the Service.
            </p>
            <p>
              7.3. Blockchain transactions are irreversible, and the Company is
              not responsible for any losses arising from errors, hacks, or
              misuse of the Service.
            </p>
            <br />
            <ol start="8">
              <li>
                <strong> Limitation of Liability</strong>
              </li>
            </ol>
            <br />
            <p>
              8.1. The Company shall not be liable for any direct, indirect,
              incidental, consequential, or punitive damages arising from your
              use of the Platform.
            </p>
            <p>
              8.2. The aggregate liability of the Company, if any, shall not
              exceed the fees paid by you for the use of the Service in the 12
              months preceding the claim.
            </p>
            <br />
            <ol start="9">
              <li>
                <strong> Privacy Policy</strong>
              </li>
            </ol>
            <br />
            <p>
              9.1. The use of the Platform is subject to our&nbsp;Privacy
              Policy, which explains how we collect, use, and protect your
              personal information.
            </p>
            <br />
            <ol start="10">
              <li>
                <strong> Modifications to the Service</strong>
              </li>
            </ol>
            <br />
            <p>
              10.1. The Company reserves the right to modify or discontinue the
              Service at any time without prior notice.
            </p>
            <p>
              10.2. Changes to these Terms will be posted on this page and will
              take effect immediately unless otherwise stated.
            </p>
            <br />
            <ol start="11">
              <li>
                <strong> Indemnification</strong>
              </li>
            </ol>
            <br />
            <p>
              11.1. You agree to indemnify and hold the Company, its affiliates,
              and employees harmless from any claims, liabilities, or expenses
              arising from your use of the Service.
            </p>
            <br />
            <ol start="12">
              <li>
                <strong> Governing Law and Dispute Resolution</strong>
              </li>
            </ol>
            <br />
            <p>12.1. This Agreement shall be governed by the laws of Italy.</p>
            <p>
              12.2. Any disputes arising under this Agreement shall be resolved
              through arbitration in Italy, except where prohibited by law.
            </p>
            <br />
            <ol start="13">
              <li>
                <strong> Termination</strong>
              </li>
            </ol>

            <p>
              13.1. The Company may terminate or suspend your access to the
              Platform at its discretion, with or without cause.
            </p>
            <br />
            <ol start="14">
              <li>
                <strong> Feedback and Suggestions</strong>
              </li>
            </ol>
            <br />
            <p>
              14.1. Any feedback or suggestions you provide regarding the
              Service shall be deemed non-confidential and may be used by the
              Company without restriction.
            </p>
            <br />
            <ol start="15">
              <li>
                <strong> Copyright</strong>
              </li>
            </ol>
            <br />
            <p>
              <strong>TAN Dapps &copy;</strong>&nbsp;is a registered software.
              All rights reserved. Unauthorized reproduction, copying,
              distribution or any other use of the whole or any part of this
              software is strictly prohibited.
            </p>
            <p>
              <strong>&nbsp;</strong>
            </p>
            <p>
              <strong>DISCLAIMER</strong>
            </p>
            <p>
              TAN Dapps and its company are free of any liability regarding
              Tokens built using Token Creator, and the use that is made of
              them. Tokens built on Token Creator, their projects, their teams,
              their use of Token (as well as anything related to Token) are in
              no way connected to TAN Dapps or its company.
            </p>
            <p>
              Anyone can use Token Creator as per their needs. Token Creator's
              purpose is to make people able to tokenize their ideas without
              coding. Smart contracts' source code is verified and well tested
              and continuously updated to reduce risk of bugs and introduce
              language optimizations. Anyway the purchase of tokens involves a
              high degree of risk. Before acquiring tokens, it is recommended to
              carefully weighs all the information and risks detailed in Token
              owner's Conditions.
            </p>
            <br />
            <p>
              <strong>
                We do not promote or recommend any financial investment.
              </strong>
            </p>
            <p>&nbsp;</p>
          </Fragment>
        </form>
      </div>
    </dialog>
  );
};

export default TermAndCondition;
