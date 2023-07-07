// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: claim/v1beta1/tx.proto

package types

import (
	context "context"
	fmt "fmt"
	github_com_cosmos_cosmos_sdk_types "github.com/cosmos/cosmos-sdk/types"
	types "github.com/cosmos/cosmos-sdk/types"
	_ "github.com/gogo/protobuf/gogoproto"
	grpc1 "github.com/gogo/protobuf/grpc"
	proto "github.com/gogo/protobuf/proto"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	io "io"
	math "math"
	math_bits "math/bits"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.GoGoProtoPackageIsVersion3 // please upgrade the proto package

type MsgClaimFor struct {
	Sender string `protobuf:"bytes,1,opt,name=sender,proto3" json:"sender,omitempty"`
	Action Action `protobuf:"varint,2,opt,name=action,proto3,enum=mun.claim.v1beta1.Action" json:"action,omitempty"`
	Proof  string `protobuf:"bytes,3,opt,name=proof,proto3" json:"proof,omitempty"`
}

func (m *MsgClaimFor) Reset()         { *m = MsgClaimFor{} }
func (m *MsgClaimFor) String() string { return proto.CompactTextString(m) }
func (*MsgClaimFor) ProtoMessage()    {}
func (*MsgClaimFor) Descriptor() ([]byte, []int) {
	return fileDescriptor_2477aa15a389ceb5, []int{0}
}
func (m *MsgClaimFor) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgClaimFor) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgClaimFor.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgClaimFor) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgClaimFor.Merge(m, src)
}
func (m *MsgClaimFor) XXX_Size() int {
	return m.Size()
}
func (m *MsgClaimFor) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgClaimFor.DiscardUnknown(m)
}

var xxx_messageInfo_MsgClaimFor proto.InternalMessageInfo

func (m *MsgClaimFor) GetSender() string {
	if m != nil {
		return m.Sender
	}
	return ""
}

func (m *MsgClaimFor) GetAction() Action {
	if m != nil {
		return m.Action
	}
	return ActionInitialClaim
}

func (m *MsgClaimFor) GetProof() string {
	if m != nil {
		return m.Proof
	}
	return ""
}

type MsgClaimForResponse struct {
	Address string `protobuf:"bytes,1,opt,name=address,proto3" json:"address,omitempty"`
	// total initial claimable amount for the user
	ClaimedAmount github_com_cosmos_cosmos_sdk_types.Coins `protobuf:"bytes,2,rep,name=claimed_amount,json=claimedAmount,proto3,castrepeated=github.com/cosmos/cosmos-sdk/types.Coins" json:"claimed_amount" yaml:"claimed_amount"`
}

func (m *MsgClaimForResponse) Reset()         { *m = MsgClaimForResponse{} }
func (m *MsgClaimForResponse) String() string { return proto.CompactTextString(m) }
func (*MsgClaimForResponse) ProtoMessage()    {}
func (*MsgClaimForResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_2477aa15a389ceb5, []int{1}
}
func (m *MsgClaimForResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgClaimForResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgClaimForResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgClaimForResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgClaimForResponse.Merge(m, src)
}
func (m *MsgClaimForResponse) XXX_Size() int {
	return m.Size()
}
func (m *MsgClaimForResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgClaimForResponse.DiscardUnknown(m)
}

var xxx_messageInfo_MsgClaimForResponse proto.InternalMessageInfo

func (m *MsgClaimForResponse) GetAddress() string {
	if m != nil {
		return m.Address
	}
	return ""
}

func (m *MsgClaimForResponse) GetClaimedAmount() github_com_cosmos_cosmos_sdk_types.Coins {
	if m != nil {
		return m.ClaimedAmount
	}
	return nil
}

type MsgUpdateMerkleRoot struct {
	Sender    string `protobuf:"bytes,1,opt,name=sender,proto3" json:"sender,omitempty"`
	RootValue string `protobuf:"bytes,2,opt,name=root_value,json=rootValue,proto3" json:"root_value,omitempty"`
}

func (m *MsgUpdateMerkleRoot) Reset()         { *m = MsgUpdateMerkleRoot{} }
func (m *MsgUpdateMerkleRoot) String() string { return proto.CompactTextString(m) }
func (*MsgUpdateMerkleRoot) ProtoMessage()    {}
func (*MsgUpdateMerkleRoot) Descriptor() ([]byte, []int) {
	return fileDescriptor_2477aa15a389ceb5, []int{2}
}
func (m *MsgUpdateMerkleRoot) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgUpdateMerkleRoot) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgUpdateMerkleRoot.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgUpdateMerkleRoot) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgUpdateMerkleRoot.Merge(m, src)
}
func (m *MsgUpdateMerkleRoot) XXX_Size() int {
	return m.Size()
}
func (m *MsgUpdateMerkleRoot) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgUpdateMerkleRoot.DiscardUnknown(m)
}

var xxx_messageInfo_MsgUpdateMerkleRoot proto.InternalMessageInfo

func (m *MsgUpdateMerkleRoot) GetSender() string {
	if m != nil {
		return m.Sender
	}
	return ""
}

func (m *MsgUpdateMerkleRoot) GetRootValue() string {
	if m != nil {
		return m.RootValue
	}
	return ""
}

type MsgUpdateMerkleRootResponse struct {
}

func (m *MsgUpdateMerkleRootResponse) Reset()         { *m = MsgUpdateMerkleRootResponse{} }
func (m *MsgUpdateMerkleRootResponse) String() string { return proto.CompactTextString(m) }
func (*MsgUpdateMerkleRootResponse) ProtoMessage()    {}
func (*MsgUpdateMerkleRootResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_2477aa15a389ceb5, []int{3}
}
func (m *MsgUpdateMerkleRootResponse) XXX_Unmarshal(b []byte) error {
	return m.Unmarshal(b)
}
func (m *MsgUpdateMerkleRootResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	if deterministic {
		return xxx_messageInfo_MsgUpdateMerkleRootResponse.Marshal(b, m, deterministic)
	} else {
		b = b[:cap(b)]
		n, err := m.MarshalToSizedBuffer(b)
		if err != nil {
			return nil, err
		}
		return b[:n], nil
	}
}
func (m *MsgUpdateMerkleRootResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MsgUpdateMerkleRootResponse.Merge(m, src)
}
func (m *MsgUpdateMerkleRootResponse) XXX_Size() int {
	return m.Size()
}
func (m *MsgUpdateMerkleRootResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_MsgUpdateMerkleRootResponse.DiscardUnknown(m)
}

var xxx_messageInfo_MsgUpdateMerkleRootResponse proto.InternalMessageInfo

func init() {
	proto.RegisterType((*MsgClaimFor)(nil), "mun.claim.v1beta1.MsgClaimFor")
	proto.RegisterType((*MsgClaimForResponse)(nil), "mun.claim.v1beta1.MsgClaimForResponse")
	proto.RegisterType((*MsgUpdateMerkleRoot)(nil), "mun.claim.v1beta1.MsgUpdateMerkleRoot")
	proto.RegisterType((*MsgUpdateMerkleRootResponse)(nil), "mun.claim.v1beta1.MsgUpdateMerkleRootResponse")
}

func init() { proto.RegisterFile("claim/v1beta1/tx.proto", fileDescriptor_2477aa15a389ceb5) }

var fileDescriptor_2477aa15a389ceb5 = []byte{
	// 439 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x8c, 0x52, 0xc1, 0x6e, 0xd4, 0x30,
	0x10, 0x5d, 0x77, 0xc5, 0xc2, 0xba, 0xa2, 0x82, 0x50, 0xaa, 0x34, 0xa8, 0xde, 0x28, 0x07, 0x14,
	0x09, 0xe1, 0x68, 0x97, 0x1b, 0xb7, 0xb6, 0x12, 0x12, 0x12, 0x7b, 0x89, 0x04, 0x07, 0x2e, 0x2b,
	0x27, 0x31, 0x21, 0x34, 0xf1, 0x44, 0xb6, 0x53, 0xb5, 0xdf, 0xc0, 0x85, 0xef, 0xe0, 0x1f, 0x38,
	0x22, 0xf5, 0xd8, 0x23, 0xa7, 0x82, 0x76, 0xff, 0x80, 0x2f, 0x40, 0xb1, 0xb3, 0x51, 0x4b, 0x5b,
	0xc4, 0x29, 0x99, 0x79, 0x6f, 0xe6, 0xcd, 0x3c, 0x0f, 0xde, 0x49, 0x4b, 0x56, 0x54, 0xd1, 0xf1,
	0x34, 0xe1, 0x9a, 0x4d, 0x23, 0x7d, 0x42, 0x6b, 0x09, 0x1a, 0x9c, 0x87, 0x55, 0x23, 0xa8, 0xc1,
	0x68, 0x87, 0x79, 0xdb, 0x39, 0xe4, 0x60, 0xd0, 0xa8, 0xfd, 0xb3, 0x44, 0x8f, 0xa4, 0xa0, 0x2a,
	0x50, 0x51, 0xc2, 0x14, 0xef, 0xdb, 0xa4, 0x50, 0x88, 0x0e, 0xf7, 0xaf, 0x0a, 0x98, 0x68, 0x21,
	0x79, 0x0a, 0x32, 0xb3, 0x8c, 0x40, 0xe0, 0xcd, 0xb9, 0xca, 0x0f, 0x5b, 0xe0, 0x15, 0x48, 0x67,
	0x07, 0x8f, 0x14, 0x17, 0x19, 0x97, 0x2e, 0xf2, 0x51, 0x38, 0x8e, 0xbb, 0xc8, 0x99, 0xe2, 0x11,
	0x4b, 0x75, 0x01, 0xc2, 0xdd, 0xf0, 0x51, 0xb8, 0x35, 0xdb, 0xa5, 0xd7, 0x46, 0xa4, 0xfb, 0x86,
	0x10, 0x77, 0x44, 0x67, 0x1b, 0xdf, 0xa9, 0x25, 0xc0, 0x07, 0x77, 0x68, 0x3a, 0xd9, 0x20, 0xf8,
	0x86, 0xf0, 0xa3, 0x4b, 0x82, 0x31, 0x57, 0x35, 0x08, 0xc5, 0x1d, 0x17, 0xdf, 0x65, 0x59, 0x26,
	0xb9, 0x52, 0x9d, 0xf2, 0x3a, 0x74, 0x3e, 0x23, 0xbc, 0x65, 0x84, 0x78, 0xb6, 0x60, 0x15, 0x34,
	0x42, 0xbb, 0x1b, 0xfe, 0x30, 0xdc, 0x9c, 0xed, 0x52, 0xbb, 0x3d, 0x6d, 0xb7, 0xef, 0xa7, 0x38,
	0x84, 0x42, 0x1c, 0xbc, 0x3e, 0xbb, 0x98, 0x0c, 0x7e, 0x5f, 0x4c, 0x1e, 0x9f, 0xb2, 0xaa, 0x7c,
	0x19, 0x5c, 0x2d, 0x0f, 0xbe, 0xfe, 0x9c, 0x84, 0x79, 0xa1, 0x3f, 0x36, 0x09, 0x4d, 0xa1, 0x8a,
	0x3a, 0x0f, 0xed, 0xe7, 0xb9, 0xca, 0x8e, 0x22, 0x7d, 0x5a, 0x73, 0x65, 0x3a, 0xa9, 0xf8, 0x7e,
	0x57, 0xbc, 0x6f, 0x6b, 0xdf, 0x98, 0xf1, 0xdf, 0xd6, 0x19, 0xd3, 0x7c, 0xce, 0xe5, 0x51, 0xc9,
	0x63, 0x00, 0x7d, 0xab, 0x6f, 0x7b, 0x18, 0x4b, 0x00, 0xbd, 0x38, 0x66, 0x65, 0xc3, 0x8d, 0x77,
	0xe3, 0x78, 0xdc, 0x66, 0xde, 0xb5, 0x89, 0x60, 0x0f, 0x3f, 0xb9, 0xa1, 0xdb, 0xda, 0x94, 0xd9,
	0x77, 0x84, 0x87, 0x73, 0x95, 0x3b, 0x31, 0xbe, 0xd7, 0xbf, 0x10, 0xb9, 0xc1, 0xf9, 0x4b, 0x86,
	0x7a, 0x4f, 0xff, 0x8d, 0xf7, 0x86, 0x7f, 0xc2, 0x0f, 0xae, 0x6d, 0x71, 0x4b, 0xed, 0xdf, 0x3c,
	0x8f, 0xfe, 0x1f, 0x6f, 0xad, 0x75, 0xf0, 0xec, 0x6c, 0x49, 0xd0, 0xf9, 0x92, 0xa0, 0x5f, 0x4b,
	0x82, 0xbe, 0xac, 0xc8, 0xe0, 0x7c, 0x45, 0x06, 0x3f, 0x56, 0x64, 0xf0, 0xbe, 0xbd, 0xf4, 0xe8,
	0xc4, 0x1e, 0xa6, 0xb5, 0x3d, 0x19, 0x99, 0xc3, 0x7c, 0xf1, 0x27, 0x00, 0x00, 0xff, 0xff, 0x48,
	0xe1, 0xba, 0xa1, 0x1d, 0x03, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// MsgClient is the client API for Msg service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type MsgClient interface {
	// rpc InitialClaim(MsgInitialClaim) returns (MsgInitialClaimResponse);
	ClaimFor(ctx context.Context, in *MsgClaimFor, opts ...grpc.CallOption) (*MsgClaimForResponse, error)
	UpdateMerkleRoot(ctx context.Context, in *MsgUpdateMerkleRoot, opts ...grpc.CallOption) (*MsgUpdateMerkleRootResponse, error)
}

type msgClient struct {
	cc grpc1.ClientConn
}

func NewMsgClient(cc grpc1.ClientConn) MsgClient {
	return &msgClient{cc}
}

func (c *msgClient) ClaimFor(ctx context.Context, in *MsgClaimFor, opts ...grpc.CallOption) (*MsgClaimForResponse, error) {
	out := new(MsgClaimForResponse)
	err := c.cc.Invoke(ctx, "/mun.claim.v1beta1.Msg/ClaimFor", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *msgClient) UpdateMerkleRoot(ctx context.Context, in *MsgUpdateMerkleRoot, opts ...grpc.CallOption) (*MsgUpdateMerkleRootResponse, error) {
	out := new(MsgUpdateMerkleRootResponse)
	err := c.cc.Invoke(ctx, "/mun.claim.v1beta1.Msg/UpdateMerkleRoot", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MsgServer is the server API for Msg service.
type MsgServer interface {
	// rpc InitialClaim(MsgInitialClaim) returns (MsgInitialClaimResponse);
	ClaimFor(context.Context, *MsgClaimFor) (*MsgClaimForResponse, error)
	UpdateMerkleRoot(context.Context, *MsgUpdateMerkleRoot) (*MsgUpdateMerkleRootResponse, error)
}

// UnimplementedMsgServer can be embedded to have forward compatible implementations.
type UnimplementedMsgServer struct {
}

func (*UnimplementedMsgServer) ClaimFor(ctx context.Context, req *MsgClaimFor) (*MsgClaimForResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ClaimFor not implemented")
}
func (*UnimplementedMsgServer) UpdateMerkleRoot(ctx context.Context, req *MsgUpdateMerkleRoot) (*MsgUpdateMerkleRootResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateMerkleRoot not implemented")
}

func RegisterMsgServer(s grpc1.Server, srv MsgServer) {
	s.RegisterService(&_Msg_serviceDesc, srv)
}

func _Msg_ClaimFor_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MsgClaimFor)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgServer).ClaimFor(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/mun.claim.v1beta1.Msg/ClaimFor",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).ClaimFor(ctx, req.(*MsgClaimFor))
	}
	return interceptor(ctx, in, info, handler)
}

func _Msg_UpdateMerkleRoot_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(MsgUpdateMerkleRoot)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MsgServer).UpdateMerkleRoot(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/mun.claim.v1beta1.Msg/UpdateMerkleRoot",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MsgServer).UpdateMerkleRoot(ctx, req.(*MsgUpdateMerkleRoot))
	}
	return interceptor(ctx, in, info, handler)
}

var _Msg_serviceDesc = grpc.ServiceDesc{
	ServiceName: "mun.claim.v1beta1.Msg",
	HandlerType: (*MsgServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "ClaimFor",
			Handler:    _Msg_ClaimFor_Handler,
		},
		{
			MethodName: "UpdateMerkleRoot",
			Handler:    _Msg_UpdateMerkleRoot_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "claim/v1beta1/tx.proto",
}

func (m *MsgClaimFor) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgClaimFor) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgClaimFor) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.Proof) > 0 {
		i -= len(m.Proof)
		copy(dAtA[i:], m.Proof)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Proof)))
		i--
		dAtA[i] = 0x1a
	}
	if m.Action != 0 {
		i = encodeVarintTx(dAtA, i, uint64(m.Action))
		i--
		dAtA[i] = 0x10
	}
	if len(m.Sender) > 0 {
		i -= len(m.Sender)
		copy(dAtA[i:], m.Sender)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Sender)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *MsgClaimForResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgClaimForResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgClaimForResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.ClaimedAmount) > 0 {
		for iNdEx := len(m.ClaimedAmount) - 1; iNdEx >= 0; iNdEx-- {
			{
				size, err := m.ClaimedAmount[iNdEx].MarshalToSizedBuffer(dAtA[:i])
				if err != nil {
					return 0, err
				}
				i -= size
				i = encodeVarintTx(dAtA, i, uint64(size))
			}
			i--
			dAtA[i] = 0x12
		}
	}
	if len(m.Address) > 0 {
		i -= len(m.Address)
		copy(dAtA[i:], m.Address)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Address)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *MsgUpdateMerkleRoot) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgUpdateMerkleRoot) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgUpdateMerkleRoot) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	if len(m.RootValue) > 0 {
		i -= len(m.RootValue)
		copy(dAtA[i:], m.RootValue)
		i = encodeVarintTx(dAtA, i, uint64(len(m.RootValue)))
		i--
		dAtA[i] = 0x12
	}
	if len(m.Sender) > 0 {
		i -= len(m.Sender)
		copy(dAtA[i:], m.Sender)
		i = encodeVarintTx(dAtA, i, uint64(len(m.Sender)))
		i--
		dAtA[i] = 0xa
	}
	return len(dAtA) - i, nil
}

func (m *MsgUpdateMerkleRootResponse) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalToSizedBuffer(dAtA[:size])
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *MsgUpdateMerkleRootResponse) MarshalTo(dAtA []byte) (int, error) {
	size := m.Size()
	return m.MarshalToSizedBuffer(dAtA[:size])
}

func (m *MsgUpdateMerkleRootResponse) MarshalToSizedBuffer(dAtA []byte) (int, error) {
	i := len(dAtA)
	_ = i
	var l int
	_ = l
	return len(dAtA) - i, nil
}

func encodeVarintTx(dAtA []byte, offset int, v uint64) int {
	offset -= sovTx(v)
	base := offset
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return base
}
func (m *MsgClaimFor) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Sender)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	if m.Action != 0 {
		n += 1 + sovTx(uint64(m.Action))
	}
	l = len(m.Proof)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	return n
}

func (m *MsgClaimForResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Address)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	if len(m.ClaimedAmount) > 0 {
		for _, e := range m.ClaimedAmount {
			l = e.Size()
			n += 1 + l + sovTx(uint64(l))
		}
	}
	return n
}

func (m *MsgUpdateMerkleRoot) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	l = len(m.Sender)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	l = len(m.RootValue)
	if l > 0 {
		n += 1 + l + sovTx(uint64(l))
	}
	return n
}

func (m *MsgUpdateMerkleRootResponse) Size() (n int) {
	if m == nil {
		return 0
	}
	var l int
	_ = l
	return n
}

func sovTx(x uint64) (n int) {
	return (math_bits.Len64(x|1) + 6) / 7
}
func sozTx(x uint64) (n int) {
	return sovTx(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *MsgClaimFor) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: MsgClaimFor: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgClaimFor: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Sender", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Sender = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Action", wireType)
			}
			m.Action = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Action |= Action(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Proof", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Proof = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *MsgClaimForResponse) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: MsgClaimForResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgClaimForResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Address", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Address = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field ClaimedAmount", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= int(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + msglen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.ClaimedAmount = append(m.ClaimedAmount, types.Coin{})
			if err := m.ClaimedAmount[len(m.ClaimedAmount)-1].Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *MsgUpdateMerkleRoot) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: MsgUpdateMerkleRoot: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgUpdateMerkleRoot: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Sender", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.Sender = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field RootValue", wireType)
			}
			var stringLen uint64
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowTx
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				stringLen |= uint64(b&0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			intStringLen := int(stringLen)
			if intStringLen < 0 {
				return ErrInvalidLengthTx
			}
			postIndex := iNdEx + intStringLen
			if postIndex < 0 {
				return ErrInvalidLengthTx
			}
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			m.RootValue = string(dAtA[iNdEx:postIndex])
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func (m *MsgUpdateMerkleRootResponse) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowTx
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= uint64(b&0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: MsgUpdateMerkleRootResponse: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: MsgUpdateMerkleRootResponse: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		default:
			iNdEx = preIndex
			skippy, err := skipTx(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if (skippy < 0) || (iNdEx+skippy) < 0 {
				return ErrInvalidLengthTx
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipTx(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	depth := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowTx
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowTx
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
		case 1:
			iNdEx += 8
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowTx
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if length < 0 {
				return 0, ErrInvalidLengthTx
			}
			iNdEx += length
		case 3:
			depth++
		case 4:
			if depth == 0 {
				return 0, ErrUnexpectedEndOfGroupTx
			}
			depth--
		case 5:
			iNdEx += 4
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
		if iNdEx < 0 {
			return 0, ErrInvalidLengthTx
		}
		if depth == 0 {
			return iNdEx, nil
		}
	}
	return 0, io.ErrUnexpectedEOF
}

var (
	ErrInvalidLengthTx        = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowTx          = fmt.Errorf("proto: integer overflow")
	ErrUnexpectedEndOfGroupTx = fmt.Errorf("proto: unexpected end of group")
)
