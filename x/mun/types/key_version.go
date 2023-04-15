package types

import "encoding/binary"

var _ binary.ByteOrder

const (
	// VersionKeyPrefix is the prefix to retrieve all Version
	VersionKeyPrefix = "Version/value/"
)

// VersionKey returns the store key to retrieve a Version from the index fields
func VersionKey(
	index string,
) []byte {
	var key []byte

	indexBytes := []byte(index)
	key = append(key, indexBytes...)
	key = append(key, []byte("/")...)

	return key
}
